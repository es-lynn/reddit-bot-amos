import Logic from '../src/util/Logic'
import { DateUtil } from '@aelesia/commons/dist/src/collections/util/DateUtil'
import { Cfg } from '../src/app/config/Cfg'
import { Time } from '@aelesia/commons'
import { PostFactory } from './factories/Factories'
import { Post } from '../src/db/model/Post'

describe('Logic', () => {
  test('Title contains "Amos"', async () => {
    expect(
      Logic.is_amos_yee_thread({
        title: 'today i saw amos get beaten up',
        body: 'some selftext'
      } as any)
    ).toEqual(true)
  })

  test('Title contains Amos Yee', async () => {
    expect(
      Logic.is_amos_yee_thread({
        title: 'Remember When Amos Yee Used to Be Cute?',
        body: 'some selftext'
      } as any)
    ).toEqual(true)
  })

  test('Thread body contains "Amos Yee"', async () => {
    expect(
      Logic.is_amos_yee_thread({
        title: 'some title',
        body: 'imagine if elon musk called amos yee a pedoguy'
      } as any)
    ).toEqual(true)
  })

  test('Thread does not contain "Amos"', async () => {
    expect(
      Logic.is_amos_yee_thread({
        title: 'some title',
        body: 'some self text'
      } as any)
    ).toEqual(false)
  })

  test('Thread selftext is case insensitive', async () => {
    expect(
      Logic.is_amos_yee_thread({
        title: 'some title',
        body: 'LOREM IPSUM aMoS YeE'
      } as any)
    ).toEqual(true)
  })

  test('Thread title is case insensitive', async () => {
    expect(
      Logic.is_amos_yee_thread({
        title: 'my hero is AmOs',
        body: 'some selftext'
      } as any)
    ).toEqual(true)
  })

  test('Comment contains "Amos Yee"', async () => {
    expect(
      Logic.is_amos_yee_comment({
        body: 'today i saw amos yee get beaten up sia'
      } as any)
    ).toEqual(true)
  })

  test('Comment does not contain "Amos Yee"', async () => {
    expect(
      Logic.is_amos_yee_comment({
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      } as any)
    ).toEqual(false)
  })

  test('Comment is case insensitive', async () => {
    expect(
      Logic.is_amos_yee_comment({
        body: 'Lorem ipsum dolor aMoS YeE sit amet, consectetur adipiscing elit'
      } as any)
    ).toEqual(true)
  })

  test('Post contains amos & yee side by side #1', async () => {
    expect(Logic.contains_amos_yee_beside('Famos Cockyees')).toEqual(true)
  })

  test('Post contains amos & yee side by side #2', async () => {
    expect(Logic.contains_amos_yee_beside('Amos YeEeEeEeE')).toEqual(true)
  })

  test('Post exact match both the words amos & yee #1', async () => {
    expect(Logic.contains_amos_and_yee_exact('There was an Amos. Yee was stupid.')).toEqual(true)
  })

  test('Post exact match both the words amos & yee #2', async () => {
    expect(Logic.contains_amos_and_yee_exact('Yee? Amos!')).toEqual(true)
  })

  test('Comment is not about Amos Yee', async () => {
    expect(
      Logic.is_amos_yee_comment({
        body: 'we need to do something about famous amos. their employees are paid too much.'
      } as any)
    ).toEqual(false)
  })

  describe('Spam posts', () => {
    Cfg.COOLDOWN_SPAM_TIME = Time.secs(60)

    test('Is spam post', async () => {
      expect(
        Logic.is_not_spam_post(
          PostFactory.new({
            author: 'spam_user',
            date: DateUtil.now()
          }),
          PostFactory.new({
            author: 'spam_user',
            date: DateUtil.now().minus(Time.secs(30))
          })
        )
      ).toEqual(false)
    })

    test('Is not spam post (different author)', async () => {
      expect(
        Logic.is_not_spam_post(
          PostFactory.new({
            author: 'spam_user',
            date: DateUtil.now()
          }),
          PostFactory.new({
            author: 'not_a_spam_user',
            date: DateUtil.now().minus(Time.secs(30))
          })
        )
      ).toEqual(true)
    })

    test('Is not spam post (past cooldown)', async () => {
      expect(
        Logic.is_not_spam_post(
          PostFactory.new({
            author: 'spam_user',
            date: DateUtil.now()
          }),
          PostFactory.new({
            author: 'spam_user',
            date: DateUtil.now().minus(Time.secs(61))
          })
        )
      ).toEqual(true)
    })
  })

  test('Is summoning bot', () => {
    Cfg.REDDIT_SELF = 'username'
    expect(
      Logic.is_summoning_bot(
        PostFactory.new({
          body: `something /u/${Cfg.REDDIT_SELF} something`
        })
      )
    ).toEqual(true)
  })

  test('Is summoning bot #2', () => {
    Cfg.REDDIT_SELF = 'username'
    expect(
      Logic.is_summoning_bot(
        PostFactory.new({
          body: `something ${Cfg.REDDIT_SELF} something`
        })
      )
    ).toEqual(false)
  })

  test('Title contains Polocle', async () => {
    expect(
      Logic.is_amos_yee_thread({
        title: 'today i saw polocle get beaten up',
        body: 'some selftext'
      } as any)
    ).toEqual(true)
  })

  test('Title contains Polocle (case insensitive)', async () => {
    expect(
      Logic.is_amos_yee_thread({
        title: 'today i saw pOLocLe get beaten up',
        body: 'some selftext'
      } as any)
    ).toEqual(true)
  })

  test('Thread contains Polocle', async () => {
    expect(
      Logic.is_amos_yee_thread({
        title: 'today i saw someone get beaten up',
        body: 'some selftextpolocle'
      } as any)
    ).toEqual(true)
  })

  test('Comment contains Polocle', async () => {
    expect(
      Logic.is_amos_yee_comment({
        body: 'we need to do something about polocle. their employees are paid too much.'
      } as any)
    ).toEqual(true)
  })

  test('contains_amos_a_y_yee', () => {
    expect(Logic.contains_amos_a_y_yee("You'll never be as useless and unsuccessful as a certain A.YEE")).toBeTruthy()
    expect(Logic.contains_amos_a_y_yee('y_amos = y_amos += x_amos')).toBeTruthy()
    expect(
      Logic.contains_amos_a_y_yee(
        'Is this what Amos Y- (ok I can hear the bot making angry noises) would have become if he had been given an elite education?'
      )
    ).toBeTruthy()
  })

  test('is not amos_yee thread', () => {
    expect(Logic.contains_amos_a_y_yee('AY')).toBeFalsy()
    expect(Logic.contains_amos_a_y_yee('A.Y')).toBeFalsy()
    expect(Logic.contains_amos_a_y_yee('A*** Y**')).toBeFalsy()
    expect(
      Logic.is_amos_yee_comment({
        body:
          'Now, before you label me as a "feminist" or "SJW", hear me out. Warning though, relatively long post ahead. Might be rant-y in nature.\n' +
          "A Reddit post over Shaun Ho's case can be found here: NTU undergraduate admits to taking illicit videos of 335 women, including victims on campus\n"
      } as Post)
    ).toBeFalsy()
  })
})
