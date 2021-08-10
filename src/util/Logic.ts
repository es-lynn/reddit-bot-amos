import { Post } from '../db/model/Post'
import { Err, Format } from '@aelesia/commons'
import { Log } from '../app/spring/Log'
import { Cfg } from '../app/config/Cfg'

export default class Logic {
  static is_amos_yee_comment(comment: Post): boolean {
    if (
      this.contains_amos_yee_beside(comment.body) ||
      this.contains_amos_and_yee_exact(comment.body) ||
      this.contains_polocle(comment.body) ||
      this.contains__a_yee__amos_y__y_amos(comment.body)
    ) {
      Log.info('is_amos_yee_comment', comment.id)
      return true
    }
    return false
  }

  static is_amos_yee_thread(thread: Post): boolean {
    if (
      this.contains_amos_yee_beside(thread.body) ||
      this.contains_amos_and_yee_exact(thread.body) ||
      thread.title.toLowerCase().includes('amos') ||
      thread.title.toLowerCase().includes('polocle') ||
      this.contains_polocle(thread.body) ||
      this.contains__a_yee__amos_y__y_amos(thread.body)
    ) {
      Log.info('is_amos_yee_thread', thread.id)
      return true
    }
    return false
  }

  static contains_amos_yee_beside(text: string): boolean {
    return /\w*amos\w*[ ,.]*\w*yee\w*/g.test(text.toLowerCase())
  }

  // FIXME: This is duplicated by `contains_amos_a_y_yee`
  static contains_amos_and_yee_exact(text: string): boolean {
    return /\bamos\b/g.test(text.toLowerCase()) && /\byee\b/g.test(text.toLowerCase())
  }

  static contains__a_yee__amos_y__y_amos(text: string): boolean {
    const lowerText = text.toLowerCase()
    const a_yee = /(\b|_)a(\b|_)[^a-zA-Z0-9]*yee/g.test(lowerText)
    const amos_y = /amos[^a-zA-Z0-9]*y/g.test(lowerText)
    const y_amos = /(\b|_)y(\b|_)[^a-zA-Z0-9]*amos/g.test(lowerText)
    if (a_yee || amos_y || y_amos) {
      return true
    }
    return false
  }

  static contains_polocle(text: string): boolean {
    return text.toLowerCase().includes('polocle')
  }

  static contains_amos(text: string): boolean {
    return text.toLowerCase().includes('amos')
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

  static is_summoning_bot(post: Post): boolean {
    if (post.body.includes(`/u/${Cfg.REDDIT_SELF}`)) {
      Log.info('is_summoning_bot', { post_id: post.id, user: post.author })
      return true
    }
    return false
  }
}
