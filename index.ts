import { extend } from '@aelesia/commons-ext'
import { Cfg } from './src/app/config/Cfg'
import Filter from './src/util/Filter'
import { AmosBot } from './src/app/AmosBot'
import { RedditAPIErr } from 'reddit-ts'
import { Log } from './src/app/spring/Log'

extend.all()
;(async (): Promise<void> => {
  let bot = new AmosBot()
  await bot.init()
  setInterval(() => {
    bot.run().catch(e => {
      if (e instanceof RedditAPIErr.ServerBusy) {
        Log.warn('AmosBot', e).e()
      } else if (e instanceof RedditAPIErr.General) {
        Log.error('AmosBot', e).e()
      } else if (e instanceof Error) {
        Log.fatal('AmosBot', e).e()
      }
      // FIXME: I don't like this
      Filter.reset_cache()
    })
  }, Cfg.INTERVAL)
})()
