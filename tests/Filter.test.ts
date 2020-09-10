import Filter from '../src/util/Filter'
import { Cfg } from '../src/app/config/Cfg'
import { Post } from '../src/db/model/Post'

describe('Filter', () => {
  test('Self posts', async () => {
    let posts: Post[] = [{ author: Cfg.REDDIT_SELF }, { author: 'me' }, { author: 'you' }] as any
    let filtered = posts.filter(Filter.rm_self_posts)
    expect(posts.length).toEqual(3)
    expect(filtered.length).toEqual(2)
  })

  test('No self posts to filter', async () => {
    let posts: Post[] = [{ author: '!bot-aelesia-dev' }, { author: 'me' }, { author: 'you' }] as any
    let filtered = posts.filter(Filter.rm_self_posts)
    expect(posts.length).toEqual(3)
    expect(filtered.length).toEqual(3)
  })

  describe('Remove ignored users', () => {
    test('removes users in blacklist', async () => {
      Cfg.IGNORE_BLACKLIST = ['ignore_me_pl0x']
      let posts: Post[] = [{ author: 'ignore_me_pl0x' }, { author: 'me' }, { author: 'you' }] as any
      let filtered = posts.filter(Filter.rm_ignored_users)
      expect(posts.length).toEqual(3)
      expect(filtered.length).toEqual(2)
    })

    test('does not remove if name is contained', async () => {
      Cfg.IGNORE_BLACKLIST = ['ignore_me_pl0x']
      let posts: Post[] = [{ author: 'ignore_me_pl0xxy' }, { author: 'me' }, { author: 'you' }] as any
      let filtered = posts.filter(Filter.rm_ignored_users)
      expect(posts.length).toEqual(3)
      expect(filtered.length).toEqual(3)
    })
  })

  test('Responded', async () => {
    let posts: Post[] = [{ id: 'id1' }, { id: 'id2' }, { id: 'id3', author: Cfg.REDDIT_SELF, parent_id: 'id2' }] as any
    let filtered = Filter.rm_responded_posts(posts)
    // console.log(filtered)
    expect(posts.length).toEqual(3)
    expect(filtered.length).toEqual(2)
  })
})
