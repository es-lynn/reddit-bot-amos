import { Logger } from '../../../lib/logger/Logger'
import { Cfg } from '../config/Cfg'
import { ConsoleStream } from '../../../lib/logger/streams/ConsoleStream'
import { MixpanelStream } from '../../../lib/logger/analytics/MixpanelAnalytics'
import { Env } from '../config/Env'
import { AWSMetrics } from '../../../lib/logger/metrics/AWSMetrics'

export const Log = ((): Logger => {
  switch (Cfg.ENVIRONMENT) {
    case 'staging':
    case 'production':
      return new Logger()
        .add_log_streams(new ConsoleStream())
        .add_event_streams(new MixpanelStream(Env('MIXPANEL_TOKEN')))
        .add_error_streams(new MixpanelStream(Env('MIXPANEL_TOKEN')))
        .add_timing_streams(new AWSMetrics(Cfg.SERVICE, Env('AWSC_REGION')))
    case 'test':
    case 'local':
    default:
      return new Logger().add_log_streams(new ConsoleStream())
  }
})()
