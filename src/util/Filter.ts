import { Cfg } from '../app/config/Cfg'
import { Log } from '../app/spring/Log'
import { Post } from '../db/model/Post'

class Filter {
  private latest_comment_time = new Date(0)
  private latest_thread_time = new Date(0)

  unread_threads(posts: Post[]): Post[] {
    let unread = posts.filter(it => {
      return it.date > this.latest_thread_time
    })

    let latest_time: Date = unread.map(post => post.date).max() as any // HACK

    this.latest_thread_time = this.latest_thread_time > latest_time ? this.latest_thread_time : latest_time
    return unread
  }

  unread_comments(posts: Post[]): Post[] {
    let unread = posts.filter(it => {
      return it.date > this.latest_comment_time
    })

    let latest_time = unread.map(post => post.date).max() as any // HACK

    this.latest_comment_time = this.latest_comment_time > latest_time ? this.latest_comment_time : latest_time
    return unread
  }

  rm_self_posts(post: Post): boolean {
    if (post.author === Cfg.REDDIT_SELF) {
      Log.info('filter.self', { id: post.id })
      return false
    }
    return true
  }

  rm_responded_posts(posts: Post[]): Post[] {
    let self_posts = posts
      .filter(it => {
        return it.author === Cfg.REDDIT_SELF
      })
      .map(it => {
        return it.parent_id
      })
    return posts.filter(it => {
      if (self_posts.includes(it.id)) {
        Log.info('filter.responded', { id: it.id })
        return false
      }
      return true
    })
  }

  reset_cache(): void {
    this.latest_comment_time = new Date(0)
    this.latest_thread_time = new Date(0)
  }
}
export default new Filter()
