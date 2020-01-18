import {Kind} from '../lib/reddit_api/types/Post.type'
import {Reply} from '../src/app/Reply'
import {DateUtil, StringUtil} from "@aelesia/commons";

describe('Reply', () => {

	test('Test view response', async () => {
		console.log(DateUtil.to_date(1575227371))
		console.log(DateUtil.to_date(1577732971))
		console.log(Reply.reset_counter({
			author: 'the_second_bugger',
			date: 1577732971,
			title: 'The Second Thread',
			url: 'http://url.com/second'
		} as any, {
			author: 'the_first_bugger',
			date: 1575227371,
			title: 'The first Thread',
			url: 'http://url.com/first'
		} as any))
	})

	test('Pretty Time', async () => {
		// @ts-ignore
		expect (Reply.pretty_time('30'.sec())).toEqual('30 seconds')
		// @ts-ignore
		expect (Reply.pretty_time('90'.sec())).toEqual('90 seconds')
		// @ts-ignore
		expect (Reply.pretty_time('2'.min())).toEqual('2 minutes')
		// @ts-ignore
		expect (Reply.pretty_time('99'.min())).toEqual('99 minutes')
		// @ts-ignore
		expect (Reply.pretty_time('3'.hour())).toEqual('3 hours')
		// @ts-ignore
		expect (Reply.pretty_time('47'.hour())).toEqual('47 hours')
		// @ts-ignore
		expect (Reply.pretty_time('49'.hour())).toEqual('2 days')
	})


})
