import {DB_Posts, Log, Reddit} from './Spring'
import Config from './Configuration'
import Logic from '../util/Logic'
import {Post} from '../../lib/reddit_api/types/Post.type'
import Filter from '../util/Filter'
import {Reply} from './Reply'


export class AmosBot {
	historic_posts: Post[] = null as any

	async init(): Promise<void> {
		this.historic_posts = await DB_Posts.scan()
		this.historic_posts.sort((a,b) => {
			return (a.date > b.date ? 1 : -1)
		})
	}

	async run(): Promise<void> {
		let posts = await this.retrieve_posts()
		for (const it of posts) {
			if (Logic.is_amos_yee_post(it) && Logic.is_new_amos_thread(it, this.historic_posts)) {
				await this.onAmosYeePost(it)
			}
		}
	}

	async retrieve_posts(): Promise<Post[]> {
		let result = await Promise.all([
			Reddit.comments(Config.SUBREDDIT),
			Reddit.threads(Config.SUBREDDIT)
		])

		let comments = Filter.unread_comments(result[0])
			.filter(Filter.self_posts)
		let threads = Filter.unread_threads(result[1])

		if (!comments.is_empty())
			Log.info('new_comments', {subreddit: Config.SUBREDDIT, comments: comments.length}).count(comments.length)
		if (!threads.is_empty())
			Log.info('new_threads', {subreddit: Config.SUBREDDIT, comments: threads.length}).count(comments.length)

		return ([] as Post[]).concat(comments, threads)
	}


	async onAmosYeePost(post: Post): Promise<void> {
		Log.info('reset_counter', {user: post.author, thing_id: post.id}).count()

		let text = Reply.reset_counter(post, this.historic_posts.last())
		await Reddit.reply(post.id, text)

		this.historic_posts.push(post)
		await DB_Posts.insert(post.id, post)
	}
}