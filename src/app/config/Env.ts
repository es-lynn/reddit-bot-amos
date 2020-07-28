import { Err } from '@aelesia/commons'
import { Pkg } from './Pkg'

require('dotenv')

export function envAWSResource(resource: string): string {
  return `${Pkg.name}-${env('ENVIRONMENT')}-${env(resource)}`
}

export function env(env: string): string {
  const envvar = process.env[env]
  if (envvar == null || envvar === '') {
    if (process.env['NODE_ENV'] === 'test' || process.env['ENVIRONMENT'] === 'test') {
      return 'TEST_ENV_VAR'
    }
    throw new Err.UninitializedErr(`[Config.${env}] Not set in .env`)
  }
  return envvar as string
}

export function env_<T>() {
  return (key: keyof T): string => {
    const envvar = process.env[key as any]
    if (envvar == null || envvar === '') {
      if (process.env['NODE_ENV'] === 'test' || process.env['ENVIRONMENT'] === 'test') {
        return 'TEST_ENV_VAR'
      }
      throw new Err.UninitializedErr(`[Config.${key}] Not set in .env`)
    }
    return envvar as string
  }
}

export const Env = env_<{
  ENVIRONMENT: string
  SUBREDDIT: string
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  AWSC_REGION: string
  MIXPANEL_TOKEN: string
  DB_DEL_POLICY: string
  DB_POSTS: string
  REDDIT_SELF: string
  O2A_CLIENT_ID: string
  O2A_SECRET: string
  O2A_PASSWORD: string
}>()
