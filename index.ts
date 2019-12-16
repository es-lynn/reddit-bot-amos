require('./lib/ext/Array')
require('./lib/ext/String');
import {AmosBot} from './src/app/AmosBot'
import {RedditAPIErr} from './lib/reddit_api/RedditAPIErr'
import {Log} from './src/app/Spring'
import Filter from './src/util/Filter'
import Config from './src/app/Configuration'

(async()=>{
	let bot = new AmosBot()
	await bot.init()
	setInterval(()=>{
		bot.run().catch(e => {
			if (e instanceof RedditAPIErr.General) Log.error('AmosBot', e).e()
			else if (e instanceof Error) Log.fatal('AmosBot', e).e()
			Filter.reset_cache()
		})
	}, Config.INTERVAL)
})()

