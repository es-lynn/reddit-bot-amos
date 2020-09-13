import Logic from '../util/Logic'
import Filter from '../util/Filter'
import { Reply } from './Reply'
import { Cfg } from './config/Cfg'
import { Post } from '../db/model/Post'
import { Reddit } from './spring/RedditAPI'
import { DB_Posts } from './spring/DBPosts'
import { Log } from './spring/Log'
import { Heartbeat } from './spring/Heartbeat'
import { IllegalStateErr } from '@aelesia/commons/dist/src/error/Error'
import { Throw } from '@aelesia/commons'

export class AmosBot {
  historic_posts: Post[] = null as any

  async init(): Promise<void> {
    await this.fetch_historic_posts()
  }

  async fetch_historic_posts(): Promise<void> {
    this.historic_posts = await DB_Posts.scan()
    this.historic_posts.sort((a, b) => {
      return a.date > b.date ? 1 : -1
    })
    Log.info('fetch_historic_posts', {
      count: this.historic_posts.length,
      last_post_date: this.historic_posts.last().date
    })
  }

  async run(): Promise<void> {
    const posts = await this.retrieve_posts()
    const filtered = posts.filter(Filter.rm_ignored_users)

    for (const post of filtered) {
      if (Logic.is_amos_yee_post(post)) {
        await this.onAmosYeePost(post)
      } else if (Logic.is_summoning_bot(post)) {
        if (post.body.includes('!tag')) {
          await this.onTag(post)
        } else if (post.body.includes('!untag')) {
          await this.onUntag(post)
        }
      } else if (Logic.contains_amos(post.body)) {
        await Reddit.compose(Cfg.NOTIFY_USER, 'Contains Amos', post.url)
      }
    }
    Heartbeat.send()
  }

  async retrieve_posts(): Promise<Post[]> {
    let result = await Promise.all([Reddit.comments(Cfg.SUBREDDIT), Reddit.threads(Cfg.SUBREDDIT)])

    let comments = Filter.rm_responded_posts(Filter.unread_comments(result[0])).filter(Filter.rm_self_posts)
    let threads = Filter.rm_responded_posts(Filter.unread_threads(result[1]))

    if (!comments.isEmpty())
      Log.info('new_comments', { subreddit: Cfg.SUBREDDIT, comments: comments.length }).count(comments.length)
    if (!threads.isEmpty())
      Log.info('new_threads', { subreddit: Cfg.SUBREDDIT, comments: threads.length }).count(comments.length)

    return ([] as Post[]).concat(comments, threads)
  }

  async onAmosYeePost(post: Post): Promise<void> {
    await this.fetch_historic_posts()
    if (
      Logic.is_new_amos_thread(post, this.historic_posts) &&
      Logic.is_not_spam_post(post, this.historic_posts.last())
    ) {
      Log.info('reset_counter', { user: post.author, thing_id: post.id }).count()

      let text = Reply.reset_counter(post, this.historic_posts.last())
      this.historic_posts.push(post)
      await DB_Posts.insert(post)

      await Reddit.reply(post.id, text)
      await Reddit.compose(Cfg.NOTIFY_USER, 'Reset Counter', post.url)
    }
  }

  async onTag(post: Post): Promise<void> {
    if (post.parent_id == null) throw new IllegalStateErr()

    const user = await Reddit.user(post.author)
    if (user.total_karma > Cfg.TAG_MIN_KARMA) {
      Log.info('tag', `${post.author} has tagged ${post.parent_id}`)
      const tagged_post = await Reddit.post(post.parent_id)
      await this.onAmosYeePost(tagged_post)
    } else {
      Log.warn('onTag', `${user.name} does not have enough karma to tag.`)
      await Reddit.reply(post.id, `Sorry you need a minimum of ${Cfg.TAG_MIN_KARMA} karma to tag someone`)
    }
  }

  async onUntag(post: Post): Promise<void> {
    if (post.parent_id == null) throw new IllegalStateErr()

    if (Cfg.ADMIN_WHITELIST.includes(post.author)) {
      const untagged_post: Post = await Reddit.post(post.parent_id)
      if (untagged_post.author === Cfg.REDDIT_SELF) {
        await Reddit.delete(untagged_post.id)
        await DB_Posts.delete(untagged_post.parent_id ?? Throw(new IllegalStateErr()))
        Log.info('untag', { id: untagged_post.id })
      } else {
        Log.warn('untag', `${untagged_post.id} was not made by self`)
      }
    } else {
      Log.warn('untag', `${post.author} does not have sufficient permissions to untag user`)
      await Reddit.reply(post.id, 'Sorry, you are not authorized to untag posts')
    }
  }
}
