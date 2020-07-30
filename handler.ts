import { LambdaAPI, LambdaConfig } from '@aelesia/commons/dist/src/aws/lambda/LambdaAPI'
import * as lambda from './src/lambda/Lambda'
import { Cfg } from './src/app/config/Cfg'

LambdaConfig.whitelist = Cfg.CORS_WHITELIST

export const _records = LambdaAPI(lambda.records)
