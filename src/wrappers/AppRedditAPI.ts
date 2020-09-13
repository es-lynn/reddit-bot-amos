import { Log } from '../app/spring/Log'
import RedditAPI from 'reddit-ts'
import { Post } from 'reddit-ts/src/types/models/Post.type'

export class AppRedditAPI extends RedditAPI {
  async threads(subreddit: string): Promise<Post[]> {
    let log = Log.start_timer()
    let a = await super.threads(subreddit)
    log.silent('RedditAPI.threads', '').track_time()
    return a
  }

  async comments(subreddit: string): Promise<Post[]> {
    let log = Log.start_timer()
    let a = await super.comments(subreddit)
    log.silent('RedditAPI.comments', '').track_time()
    return a
  }

  async reply(thing_id: string, text: string): Promise<void> {
    let log = Log.start_timer()
    let a = await super.reply(thing_id, text)
    log.info('RedditAPI.reply', thing_id).track_time()
    return a
  }
}
