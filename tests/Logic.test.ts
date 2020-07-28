import Logic from '../src/util/Logic'

describe('Logic', () => {
  test('Title contains "Amos"', async () => {
    expect(
      Logic.is_amos_yee_thread({
        title: 'today i saw amos get beaten up',
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
})
