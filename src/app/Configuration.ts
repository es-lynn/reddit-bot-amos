require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })

class Configuration {

	readonly NODE_ENV: string = Configuration.dotenv('NODE_ENV')
	readonly SERVICE: string = Configuration.dotenv('SERVICE')

	readonly INTERVAL: number = '15'.sec()
	readonly SUBREDDIT: string = Configuration.dotenv('SUBREDDIT')
	// readonly COOLDOWN: number =

	readonly AWS_ACCESS_KEY: string = Configuration.dotenv('AWS_ACCESS_KEY_ID')
	readonly AWS_SECRET_ACCESS_KEY: string = Configuration.dotenv('AWS_SECRET_ACCESS_KEY')
	readonly AWS_REGION: string = Configuration.dotenv('AWS_REGION')

	readonly DB_POSTS: string = Configuration.aws_resource('DB_POSTS')

	readonly MIXPANEL_TOKEN: string = Configuration.dotenv('MIXPANEL_TOKEN')

	readonly REDDIT_SELF: string = Configuration.dotenv('REDDIT_SELF')
	readonly O2A_USER_AGENT: string = `nodejs:${this.SERVICE}:v0.1.0 (by /u/aelesia)`
	readonly O2A_CLIENT_ID: string = Configuration.dotenv('O2A_CLIENT_ID')
	readonly O2A_SECRET: string = Configuration.dotenv('O2A_SECRET')
	readonly O2A_PASSWORD: string = Configuration.dotenv('O2A_PASSWORD')

	/**
	 *  Generates AWS Resource name using the 'service-node_env-resource' convention
	 */
	private static aws_resource(resource: string): string {
		return `${Configuration.dotenv('SERVICE')}-${Configuration.dotenv('NODE_ENV')}-${Configuration.dotenv(resource)}`
	}

	private static dotenv(env: string): string {
		const envvar = process.env[env]
		if (envvar == null || envvar === '') {
			console.error(`[Config.${env}] Not set in .env`)
			throw new Error(`[Config.${env}] Not set in .env`)
		}
		return envvar
	}
}

const Config = new Configuration()
if (Config.NODE_ENV === 'development' || Config.NODE_ENV === 'dev') {
	console.debug(Config)
}

export default Config
