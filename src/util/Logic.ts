import { Post } from '../db/model/Post'
import { Err, Format } from '@aelesia/commons'
import { Log } from '../app/spring/Log'
import { Cfg } from '../app/config/Cfg'

export default class Logic {
  static is_amos_yee_comment(comment: Post): boolean {
    if (this.contains_amos_yee_beside(comment.body) || this.contains_amos_and_yee_exact(comment.body)) {
      Log.info('is_amos_yee_comment', comment.id)
      return true
    }
    return false
  }

  static is_amos_yee_thread(thread: Post): boolean {
    if (
      this.contains_amos_yee_beside(thread.body) ||
      this.contains_amos_and_yee_exact(thread.body) ||
      thread.title.toLowerCase().includes('amos')
    ) {
      Log.info('is_amos_yee_thread', thread.id)
      return true
    }
    return false
  }

  static contains_amos_yee_beside(text: string): boolean {
    return /\w*amos\w*[ ,.]*\w*yee\w*/g.test(text.toLowerCase())
  }

  static contains_amos_and_yee_exact(text: string): boolean {
    return /\bamos\b/g.test(text.toLowerCase()) && /\byee\b/g.test(text.toLowerCase())
  }

  static is_amos_yee_post(post: Post): boolean {
    switch (post.kind) {
      case 't3':
        return this.is_amos_yee_thread(post)
      case 't1':
        return this.is_amos_yee_comment(post)
      default:
        Log.warn('is_amos_yee_post', new Err.IllegalArgumentErr(JSON.stringify({ id: post.id, kind: post.kind }))).e()
        return false
    }
  }

  static is_new_amos_thread(post: Post, past_threads: Post[]): boolean {
    if (!past_threads.some(it => post.thread_id === it.thread_id)) {
      Log.info('is_new_amos_thread', { id: post.id, title: post.title })
      return true
    }
    Log.info('is_old_amos_thread', { id: post.id, title: post.title })
    return false
  }

  static is_not_spam_post(post: Post, last_post: Post): boolean {
    if (last_post.author === post.author && last_post.date.timeSince() < Cfg.COOLDOWN_SPAM_TIME) {
      Log.info('is_spam_post', {
        id: post.id,
        author: post.author,
        cooldown_time: `${Format.timeAgo(last_post.date.timeSince())} / ${Format.timeAgo(Cfg.COOLDOWN_SPAM_TIME)}`
      })
      return false
    }
    return true
  }
}
