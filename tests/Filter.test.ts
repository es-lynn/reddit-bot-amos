import Filter from '../src/util/Filter'
import {Post} from '../lib/reddit_api/types/Post.type'
import Config from '../src/app/Configuration'

describe('Filter', () => {

	test('Self posts', async () => {

		let posts: Post[] = [
			{author:Config.REDDIT_SELF},
			{author:'me'},
			{author:'you'},
		] as any
		let filtered = posts.filter(Filter.rm_self_posts)
		expect(posts.length).toEqual(3)
		expect(filtered.length).toEqual(2)
	})

	test('No self posts to filter', async () => {

		let posts: Post[] = [
			{author:'!bot-aelesia-dev'},
			{author:'me'},
			{author:'you'},
		] as any
		let filtered = posts.filter(Filter.rm_self_posts)
		expect(posts.length).toEqual(3)
		expect(filtered.length).toEqual(3)
	})

	test('Responded', async () => {

		let posts: Post[] = [
			{id: 'id1'},
			{id: 'id2'},
			{id: 'id3', author:Config.REDDIT_SELF, parent_id:'id2'},
		] as any
		let filtered = Filter.rm_responded_posts(posts)
		// console.log(filtered)
		expect(posts.length).toEqual(3)
		expect(filtered.length).toEqual(2)
	})
})
