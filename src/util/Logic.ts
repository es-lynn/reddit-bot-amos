import {Kind, Post} from '../../lib/reddit_api/types/Post.type'
import {Log} from '../app/Spring'
import {InvalidArgumentError} from '../../lib/ext/Errors'

export default class Logic {

	static is_amos_yee_comment(comment: Post): boolean {
		if (comment.body.toLowerCase().includes('amos yee')) {
			Log.info('is_amos_yee_comment', comment.id).count()
			return true
		}
		return false
	}

	static is_amos_yee_thread(thread: Post): boolean {
		if (thread.body.toLowerCase().includes('amos yee')
			|| thread.title.toLowerCase().includes('amos')) {
			Log.info('is_amos_yee_thread', thread.id).count()
			return true
		}
		return false
	}

	static is_amos_yee_post(post: Post): boolean {
		switch (post.kind) {
			case Kind.Thread:
				return this.is_amos_yee_thread(post)
			case Kind.Comment:
				return this.is_amos_yee_comment(post)
			default:
				Log.warn('is_amos_yee_post', new InvalidArgumentError(JSON.stringify({id: post.id, kind: post.kind}))).e()
				return false
		}
	}

	static is_new_amos_thread(post: Post, past_threads: Post[]): boolean {
		if (!past_threads.some(it=>{
			return post.thread_id === it.thread_id
		})) {
			Log.info('is_new_amos_thread', {id: post.id, title: post.title}).count()
			return true
		}
		Log.info('is_old_amos_thread', {id: post.id, title: post.title}).count()
		return false
	}
}
