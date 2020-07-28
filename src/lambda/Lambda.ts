import { Post } from '../db/model/Post'
import { DB_Posts } from '../app/spring/DBPosts'

export const records = async (): Promise<Post[]> => {
  const posts = await DB_Posts.scan()
  const sortedPosts = posts.sort((a, b) => b.date.getTime() - a.date.getTime())
  return sortedPosts
}
