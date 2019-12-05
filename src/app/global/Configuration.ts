require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })

class Configuration {

	readonly NODE_ENV: string = Configuration.dotenv('NODE_ENV')

	readonly AWS_ACCESS_KEY: string = Configuration.dotenv('AWS_ACCESS_KEY_ID')
	readonly AWS_SECRET_ACCESS_KEY: string = Configuration.dotenv('AWS_SECRET_ACCESS_KEY')

	// project-develop-resource
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
