import RedditAPI from '../../lib/reddit_api/RedditAPI'
import Config from "../../src/app/Configuration";
import {Kind} from "../../lib/reddit_api/types/Post.type";

describe('RedditAPI', () => {

	let reddit = new RedditAPI({
		client_id: Config.O2A_CLIENT_ID,
		client_secret: Config.O2A_SECRET,
		password: Config.O2A_PASSWORD,
		username: Config.REDDIT_SELF
	})

	test('Comments', async () => {
		let results = await reddit.comments('testingground4bots')
		console.log(results[0])
		expect(results.length).toEqual(25)
		results.forEach((r)=>{
			expect(r.kind).toEqual(Kind.Comment)
			expect(r.date).not.toBeNull()
			expect(r.url).not.toBeNull()
			expect(r.title).not.toBeNull()
			expect(r.thread_id).not.toBeNull()
			expect(r.id).not.toBeNull()
			expect(r.id).toMatch(new RegExp('t1_[\\w\\d]{7}'))
			expect(r.body).not.toBeNull()
			expect(r.author).not.toBeNull()
		})
	})

	test('Threads', async () => {
		let results = await reddit.threads('testingground4bots')
		// console.log(results[0])
		expect(results.length).toEqual(25)
		results.forEach((r)=>{
			expect(r.kind).toEqual(Kind.Thread)
			expect(r.date).not.toBeNull()
			expect(r.url).not.toBeNull()
			expect(r.title).not.toBeNull()
			expect(r.thread_id).not.toBeNull()
			expect(r.id).not.toBeNull()
			expect(r.id).toMatch(new RegExp('t3_[\\w\\d]{6}'))
			expect(r.body).not.toBeNull()
			expect(r.author).not.toBeNull()
		})
	})

	test('Token', async () => {
		// let results = await reddit.token()
		// // console.log(results)
		// expect(results.access_token).not.toBeNull()
		// expect(results.token_type).toEqual('bearer')
		// expect(results.expires_in).toEqual(3600)
		// expect(results.scope).toEqual('*')
	})

	test('Me', async() => {
		let results = await reddit.me()
		expect(results).not.toBeNull()
		expect(results.name).toEqual(Config.REDDIT_SELF)
	})

	test('Reply', async() => {
		await reddit.reply(
			't3_eaiqlw',
			'[Jest Test] RedditAPI.test.ts')
	})
})
