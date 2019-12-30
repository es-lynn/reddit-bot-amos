import {Kind, Post} from '../../lib/reddit_api/types/Post.type'
import {Log} from '../app/Spring'
import {InvalidArgumentError} from '../../lib/ext/Errors'

export default class Logic {

	static is_amos_yee_comment(comment: Post): boolean {
		if (this.contains_amos_yee_beside(comment.body)
			|| this.contains_amos_and_yee_exact(comment.body)) {
			Log.info('is_amos_yee_comment', comment.id)
			return true
		}
		return false
	}

	static is_amos_yee_thread(thread: Post): boolean {
		if (this.contains_amos_yee_beside(thread.body)
			|| this.contains_amos_and_yee_exact(thread.body)
			|| thread.title.toLowerCase().includes('amos')) {
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
			Log.info('is_new_amos_thread', {id: post.id, title: post.title})
			return true
		}
		Log.info('is_old_amos_thread', {id: post.id, title: post.title})
		return false
	}
}
