import Logic from '../util/Logic'
import Filter from '../util/Filter'
import { Reply } from './Reply'
import { Cfg } from './config/Cfg'
import { Post } from '../db/model/Post'
import { Reddit } from './spring/RedditAPI'
import { DB_Posts } from './spring/DBPosts'
import { Log } from './spring/Log'
import { Heartbeat } from './spring/Heartbeat'

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
        await this.fetch_historic_posts()
        if (Logic.is_new_amos_thread(post, this.historic_posts)) {
          await this.onAmosYeePost(post)
        }
      }
    }
    Heartbeat.send()
  }

  async retrieve_posts(): Promise<Post[]> {
    let result = await Promise.all([Reddit.comments(Cfg.SUBREDDIT), Reddit.threads(Cfg.SUBREDDIT)])

    let comments = Filter.unread_comments(result[0]).filter(Filter.rm_self_posts)
    let threads = Filter.unread_threads(result[1])

    if (!comments.isEmpty())
      Log.info('new_comments', { subreddit: Cfg.SUBREDDIT, comments: comments.length }).count(comments.length)
    if (!threads.isEmpty())
      Log.info('new_threads', { subreddit: Cfg.SUBREDDIT, comments: threads.length }).count(comments.length)

    return ([] as Post[]).concat(comments, threads)
  }

  async onAmosYeePost(post: Post): Promise<void> {
    Log.info('reset_counter', { user: post.author, thing_id: post.id }).count()

    let text = Reply.reset_counter(post, this.historic_posts.last())
    await Reddit.reply(post.id, text)

    this.historic_posts.push(post)
    await DB_Posts.insert(post)
  }
}
