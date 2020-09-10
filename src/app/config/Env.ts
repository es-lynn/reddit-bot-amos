import { Err } from '@aelesia/commons'
import { Pkg } from './Pkg'

require('dotenv')

export function envAWSResource(resource: string): string {
  return `${Pkg.name}-${env('ENVIRONMENT')}-${env(resource)}`
}

export function env(env: string): any {
  const envvar = process.env[env]
  if (envvar == null || envvar === '') {
    if (process.env['NODE_ENV'] === 'test' || process.env['ENVIRONMENT'] === 'test') {
      return 'TEST_ENV_VAR'
    }
    throw new Err.UninitializedErr(`[Config.${env}] Not set in .env`)
  }
  if (
    (envvar[0] === '{' && envvar[envvar.length - 1] === '}') ||
    (envvar[0] === '[' && envvar[envvar.length - 1] === ']')
  ) {
    return JSON.parse(envvar)
  }
  return envvar
}

function env_<T>() {
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
export const Env = env_<EnvType>()

/**
 * @experimental
 * I'm not entirely convinced that parsing .env data as JSON is a good idea
 * This is what Cfg is meant for. It reads the raw data from .env and parses it to a suitable format for usage
 * Why this could be a potentially bad idea:
 *   - Other platforms will be reading this as string while app reads it as JSON
 *   - W̶i̶l̶l̶ ̶T̶E̶S̶T̶_̶E̶N̶V̶_̶V̶A̶R̶ ̶c̶a̶u̶s̶e̶ ̶i̶s̶s̶u̶e̶s̶ ̶i̶n̶ ̶c̶a̶s̶e̶s̶ ̶l̶i̶k̶e̶ ̶[̶]̶.̶l̶a̶s̶t̶(̶)̶ ̶i̶s̶ ̶n̶o̶t̶ ̶d̶e̶f̶i̶n̶e̶d̶
 *     - False. EnvJSON is safer to use for testing
 */
export const EnvJSON: <K extends keyof EnvType>(key: K) => EnvType[K] = env
type EnvType = {
  ENVIRONMENT: 'test' | 'local' | 'develop' | 'staging' | 'production' | string
  SUBREDDIT: string
  IGNORE_BLACKLIST: string[]
  AWSC_ACCESS_KEY_ID: string
  AWSC_SECRET_ACCESS_KEY: string
  AWSC_REGION: string
  MIXPANEL_TOKEN: string
  DB_DEL_POLICY: string
  DB_POSTS: string
  REDDIT_SELF: string
  O2A_CLIENT_ID: string
  O2A_SECRET: string
  O2A_PASSWORD: string
  CORS_WHITELIST: string[]
}
