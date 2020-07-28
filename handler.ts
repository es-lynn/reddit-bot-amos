import { extend } from '@aelesia/commons-ext'
import { LambdaAPI } from '@aelesia/commons/dist/src/aws/lambda/LambdaAPI'
import * as lambda from './src/lambda/Lambda'

extend.all()

export const _records = LambdaAPI(lambda.records)
