import Logic from '../src/util/Logic'
import { DateUtil } from '@aelesia/commons/dist/src/collections/util/DateUtil'
import { Cfg } from '../src/app/config/Cfg'
import { Time } from '@aelesia/commons'
import { PostFactory } from './factories/Factories'
import { Post } from 'reddit-ts/src/types/models/Post.type'

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
    // https://www.reddit.com/r/singapore/comments/qt0odc/delivering_pizzas_samosas_and_deepavali_cheer_to/
    expect(
      Logic.is_amos_yee_thread({
        title: 'Delivering pizzas, samosas and Deepavali cheer to 10,000 migrant workers in Singapore',
        body: 'some selftext'
      } as any)
    ).toEqual(false)
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

  test('contains__a_yee__amos_y__y_amos', () => {
    expect(
      Logic.contains__a_yee__amos_y__y_amos("You'll never be as useless and unsuccessful as a certain A.YEE")
    ).toBeTruthy()
    expect(Logic.contains__a_yee__amos_y__y_amos('y_amos = y_amos += x_amos')).toBeTruthy()
    expect(
      Logic.contains__a_yee__amos_y__y_amos(
        'Is this what Amos Y- (ok I can hear the bot making angry noises) would have become if he had been given an elite education?'
      )
    ).toBeTruthy()

    expect(Logic.contains__a_yee__amos_y__y_amos('a_yee')).toBeTruthy()
    expect(Logic.contains__a_yee__amos_y__y_amos('a yee')).toBeTruthy()
    expect(Logic.contains__a_yee__amos_y__y_amos('amos.y')).toBeTruthy()
    expect(Logic.contains__a_yee__amos_y__y_amos('amos y')).toBeTruthy()

    expect(Logic.contains__a_yee__amos_y__y_amos('A fun yee')).toBeFalsy()
    expect(Logic.contains__a_yee__amos_y__y_amos('ayee')).toBeFalsy()
  })

  test('is not amos_yee thread', () => {
    expect(Logic.contains__a_yee__amos_y__y_amos('AY')).toBeFalsy()
    expect(Logic.contains__a_yee__amos_y__y_amos('A.Y')).toBeFalsy()
    expect(Logic.contains__a_yee__amos_y__y_amos('A*** Y**')).toBeFalsy()
    expect(
      Logic.is_amos_yee_comment({
        body:
          'Now, before you label me as a "feminist" or "SJW", hear me out. Warning though, relatively long post ahead. Might be rant-y in nature.\n' +
          "A Reddit post over Shaun Ho's case can be found here: NTU undergraduate admits to taking illicit videos of 335 women, including victims on campus\n"
      } as Post)
    ).toBeFalsy()
    // https://www.reddit.com/r/singapore/comments/oubigz/zb_schools_1000_covid19_isolation_beds_in_local/h7199re/?context=3
    expect(
      Logic.is_amos_yee_comment({
        body:
          'Health Minister Ong Yee Kung revealed that the local hospital currently has 1,000 isolation beds for coronary disease patients, and the number of beds in the intensive care unit has increased to nearly 70 in the past two weeks.\n' +
          '\n' +
          '"The Jurong Fishing Port infected groups have turned multiple markets into infected groups and must be closed. It is also likely to spread widely in the community, especially affecting the elderly who often visit the market. A quarter of the elderly have always been If they have not been vaccinated yet, they will be at risk of serious illness if they are infected."\n'
      } as any)
    ).toEqual(false)
  })
})
