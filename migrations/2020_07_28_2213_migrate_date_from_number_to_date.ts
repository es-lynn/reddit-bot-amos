import { DB_Posts } from '../src/app/spring/DBPosts'
;(async () => {
  const posts = await DB_Posts.scan()
  posts.forEach(it => {
    const date = it.date
    if (typeof date === 'number') {
      DB_Posts.update({
        id: it.id,
        date: new Date(date * 1000)
      })
    } else {
      console.warn(`id: ${it.id} is not of type number, ignoring`)
    }
  })
})()
