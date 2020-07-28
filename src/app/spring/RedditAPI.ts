import RedditAPI from 'reddit-ts/src/RedditAPI'
import { Cfg } from '../config/Cfg'
import { Env } from '../config/Env'

export const Reddit = new RedditAPI({
  user_agent: Cfg.O2A_USER_AGENT,
  o2a: {
    client_id: Env('O2A_CLIENT_ID'),
    client_secret: Env('O2A_SECRET'),
    password: Env('O2A_PASSWORD'),
    username: Cfg.REDDIT_SELF
  }
})
