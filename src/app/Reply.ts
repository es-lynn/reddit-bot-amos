import { _ } from '@aelesia/commons'
import { Cfg } from './config/Cfg'
import { Post } from '../db/model/Post'

export class Reply {
  // TODO: Count all time record
  // TODO: All time history
  static reset_counter(post: Post, last_post: Post): string {
    let str = ''
    str += '🎉 **RESET THE COUNTER!!!** 🎉\n\n'
    str += 'It has been '
    str += `_${Reply.adjective()}_ `
    str += `[**${Reply.pretty_time(_.time.elapsed(last_post.date, post.date))}**](${Cfg.COUNTER_URL}) `
    str += "since we've had an intellectual discussion about Amos Yee!\n\n"
    str += `Last mentioned by ${last_post.author} `
    str += `on **${_.date._f(last_post.date, 'DD MMMM YYYY')}**`
    str += `: [${last_post.title}](${last_post.url})\n\n`
    str += '----------\n\n'
    str += `v${Cfg.VERSION} | `
    str += `[${Cfg.SERVICE}](https://github.com/aelesia/reddit-bot-amos) `
    str += 'by [aelesia](https://aelesia.github.io/)'
    return str
  }

  private static adjective(): string {
    return [
      'an astonishing',
      'a mind-boggling',
      'a mind-blowing',
      'an unbelievable',
      'an inconceivable span of',
      'a grand total of',
      'a wondrous',
      'a shocking span of',
      'an exceptional span of',
      'an impressive',
      'a remarkable',
      'a peaceful span of',
      'a noteworthy',
      'a spectacular',
      'a momentous',
      'an exceptional'
    ].random()
  }

  private static pretty_time(unix_time: number): string {
    if (unix_time < 120000) {
      return `${Math.floor(unix_time / 1000)} seconds`
    } else if (unix_time < 7200000) {
      return `${Math.floor(unix_time / 60000)} minutes`
    } else if (unix_time < 172800000) {
      return `${Math.floor(unix_time / 3600000)} hours`
    } else {
      return `${Math.floor(unix_time / 86400000)} days`
    }
  }

  private static profile_url(username: string): string {
    return `https://www.reddit.com/user/${username}/`
  }
}
