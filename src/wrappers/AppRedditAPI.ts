import RedditAPI from '../../lib/reddit_api/RedditAPI'
import {Post} from '../../lib/reddit_api/types/Post.type'
import {Log} from '../app/Spring'

export class AppRedditAPI extends RedditAPI {
	async threads(subreddit: string): Promise<Post[]> {
		let log = Log.start_timer()
		let a = await super.threads(subreddit)
		log.silent('RedditAPI.threads', '').track_time().count()
		return a
	}

	async comments(subreddit: string): Promise<Post[]> {
		let log = Log.start_timer()
		let a = await super.comments(subreddit)
		log.silent('RedditAPI.comments', '').track_time().count()
		return a
	}

	async reply(thing_id: string, text: string): Promise<void> {
		let log = Log.start_timer()
		let a = await super.reply(thing_id, text)
		log.info('RedditAPI.reply', thing_id).track_time().count()
		return a
	}
}