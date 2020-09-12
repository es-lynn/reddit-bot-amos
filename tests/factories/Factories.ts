import { FakerFactory, Rand } from '@aelesia/commons'
import { Post } from '../../src/db/model/Post'
import Faker from 'faker'

export const PostFactory = new FakerFactory(
  (): Post => {
    return {
      author: Faker.internet.userName(),
      body: Faker.lorem.paragraphs(),
      date: Faker.date.past(),
      id: (Rand.maybe() ? 't1_' : 't3_') + Faker.random.alphaNumeric(6),
      kind: Rand.maybe() ? 't1' : 't3',
      parent_id: (Rand.maybe() ? 't1_' : 't3_') + Faker.random.alphaNumeric(6),
      thread_id: 't3_' + Faker.random.alphaNumeric(6),
      title: Faker.lorem.sentence(),
      url: Faker.internet.url()
    }
  }
)
