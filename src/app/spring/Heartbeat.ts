import { AWSMetrics } from '../../../lib/logger/metrics/AWSMetrics'
import { Cfg } from '../config/Cfg'
import * as AWS from 'aws-sdk'
import { Env } from '../config/Env'
import { Log } from './Log'

interface Send {
  send: () => void
}
class _Heartbeat implements Send {
  metric: AWSMetrics
  constructor(metric: AWSMetrics) {
    this.metric = metric
  }
  async send() {
    await this.metric.send('bot.run', [
      {
        name: 'Heartbeat',
        value: 1,
        unit: 'Count'
      }
    ])
  }
}

export const Heartbeat = ((): Send => {
  switch (Cfg.ENVIRONMENT) {
    case 'test':
      return {
        send: () => {}
      }
    case 'local':
      return {
        send: () => Log.info('heartbeat', '')
      }
    default:
      AWS.config.secretAccessKey = Env('AWSC_SECRET_ACCESS_KEY')
      AWS.config.accessKeyId = Env('AWSC_ACCESS_KEY_ID')
      return new _Heartbeat(new AWSMetrics(`${Cfg.SERVICE}-${Cfg.ENVIRONMENT}`, Env('AWSC_REGION')))
  }
})()
