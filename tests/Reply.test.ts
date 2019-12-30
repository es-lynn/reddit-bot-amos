import {Kind} from '../lib/reddit_api/types/Post.type'
import {Reply} from '../src/app/Reply'

describe('Reply', () => {

	test('Test view response', async () => {
		console.log(Reply.reset_counter({
			author: 'the_first_bugger',
			date: 1575227371,
			title: 'The Second Thread',
			url: 'http://url.com'
		} as any, {
			author: 'the_second_bugger',
			date: 1577732971,
			title: 'The Second Thread',
			url: 'http://url.com'
		} as any))
	})

})
