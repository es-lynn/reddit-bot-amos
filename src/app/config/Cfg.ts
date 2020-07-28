import { Env, env, envAWSResource } from './Env'
import { Pkg } from './Pkg'
import { Time } from '@aelesia/commons'

export const Cfg = new (class {
  ENVIRONMENT: 'test' | 'local' | 'develop' | 'staging' | 'production' | string = env('ENVIRONMENT')
  SERVICE = Pkg.name
  VERSION = Pkg.version

  INTERVAL = Time.secs(15)
  SUBREDDIT = Env('SUBREDDIT')

  DB_POSTS = envAWSResource('DB_POSTS')

  REDDIT_SELF = Env('REDDIT_SELF')
  O2A_USER_AGENT = `nodejs:${Pkg.name}:v${Pkg.version} (by /u/aelesia-)`
})()
