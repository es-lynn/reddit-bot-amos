import { Reply } from '../src/app/Reply'
import { _ } from '@aelesia/commons'

describe('Reply', () => {
  test('Test view response', async () => {
    console.log(_.date.parse(1575227371))
    console.log(_.date.parse(1577732971))
    console.log(
      Reply.reset_counter(
        {
          author: 'the_second_bugger',
          date: _.date.parse(1577732971),
          title: 'The Second Thread',
          url: 'http://url.com/second'
        } as any,
        {
          author: 'the_first_bugger',
          date: _.date.parse(1575227371),
          title: 'The first Thread',
          url: 'http://url.com/first'
        } as any
      )
    )
  })

  test('Pretty Time', async () => {
    // @ts-ignore
    expect(Reply.pretty_time('30'.secs())).toEqual('30 seconds')
    // @ts-ignore
    expect(Reply.pretty_time('90'.secs())).toEqual('90 seconds')
    // @ts-ignore
    expect(Reply.pretty_time('2'.mins())).toEqual('2 minutes')
    // @ts-ignore
    expect(Reply.pretty_time('99'.mins())).toEqual('99 minutes')
    // @ts-ignore
    expect(Reply.pretty_time('3'.hours())).toEqual('3 hours')
    // @ts-ignore
    expect(Reply.pretty_time('47'.hours())).toEqual('47 hours')
    // @ts-ignore
    expect(Reply.pretty_time('49'.hours())).toEqual('2 days')
  })
})
