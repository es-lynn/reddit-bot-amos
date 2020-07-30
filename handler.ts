import { LambdaAPI, LambdaConfig } from '@aelesia/commons/dist/src/aws/lambda/LambdaAPI'
import * as lambda from './src/lambda/Lambda'

export const _records = LambdaAPI(lambda.records)
