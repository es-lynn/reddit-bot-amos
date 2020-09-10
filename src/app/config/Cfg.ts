import { Env, envAWSResource, EnvJSON } from './Env'
import { Pkg } from './Pkg'
import { Time } from '@aelesia/commons'

export const Cfg = new (class {
  ENVIRONMENT = EnvJSON('ENVIRONMENT')
  SERVICE = Pkg.name
  VERSION = Pkg.version

  INTERVAL = Time.secs(15)
  SUBREDDIT = Env('SUBREDDIT')
  IGNORE_BLACKLIST = EnvJSON('IGNORE_BLACKLIST')

  DB_POSTS = envAWSResource('DB_POSTS')

  REDDIT_SELF = Env('REDDIT_SELF')
  O2A_USER_AGENT = `nodejs:${Pkg.name}:v${Pkg.version} (by /u/aelesia-)`
  CORS_WHITELIST = EnvJSON('CORS_WHITELIST')
})()
