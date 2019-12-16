import {Post} from '../../lib/reddit_api/types/Post.type'
import Config from './Configuration'
import * as AWS from 'aws-sdk'
import {AppRedditAPI} from '../wrappers/AppRedditAPI'
import {AppDyanmoDB} from '../wrappers/AppDyanmoDB'
import {Logger} from '../../lib/logger/Logger'
import {ExpressJS} from '../../lib/logger/streams/ExpressJS'
import {ConsoleStream} from '../../lib/logger/streams/ConsoleStream'
import {MixpanelStream} from '../../lib/logger/analytics/MixpanelAnalytics'
import {AWSMetrics} from '../../lib/logger/metrics/AWSMetrics'
import {ExpressJSEvents} from '../../lib/logger/analytics/ExpressJSEvents'
import {ExpressJSMetrics} from '../../lib/logger/metrics/ExpressJSMetrics'

AWS.config.secretAccessKey = Config.AWS_SECRET_ACCESS_KEY
AWS.config.accessKeyId = Config.AWS_ACCESS_KEY

export const Reddit = new AppRedditAPI({
	client_id: Config.O2A_CLIENT_ID,
	client_secret: Config.O2A_SECRET,
	password: Config.O2A_PASSWORD,
	username: Config.REDDIT_SELF,
	user_agent: Config.O2A_USER_AGENT,
})

export const DB_Posts = new AppDyanmoDB<Post>(Config.AWS_REGION, Config.DB_POSTS)

export const Log = new Logger()
	.add_log_streams(
		new ConsoleStream(),
		new ExpressJS({max: 1000, path: 'logs', port: 3000})
	)
	.add_event_streams(
		['development','testing'].includes(Config.NODE_ENV) ?
			new ExpressJSEvents({max: 1000, path: 'events', port: 3001}): new MixpanelStream(Config.MIXPANEL_TOKEN)
	)
	.add_error_streams(
		['development','testing'].includes(Config.NODE_ENV) ?
			new ExpressJSEvents({max: 1000, path: 'errors', port: 3002}) : new MixpanelStream(Config.MIXPANEL_TOKEN)
	)
	.add_timing_streams(
		['development','testing'].includes(Config.NODE_ENV) ?
			new ExpressJSMetrics({max: 1000, path: 'metrics', port: 3003}) : new AWSMetrics(Config.SERVICE, Config.AWS_REGION)
	)