import { NoSQLDatabase } from '@aelesia/commons/dist/src/aws/dynamodb/NoSQLDatabase'
import { Post } from '../../db/model/Post'
import { Cfg } from '../config/Cfg'
import { HashDatabase } from '@aelesia/commons/dist/src/aws/dynamodb/HashDatabase'
import { FileSystemDatabase } from '@aelesia/commons/dist/src/aws/dynamodb/FileSystemDatabase'
import * as AWS from 'aws-sdk'
import { Env } from '../config/Env'
import { AwsDynamodb } from '@aelesia/commons/dist/src/aws/dynamodb/AwsDynamodb'

export const DB_Posts = ((): NoSQLDatabase<Post> => {
  switch (Cfg.ENVIRONMENT) {
    case 'test':
      return new HashDatabase(Cfg.DB_POSTS)
    case 'local':
      return new FileSystemDatabase(Cfg.DB_POSTS)
    default:
      AWS.config.secretAccessKey = Env('AWSC_SECRET_ACCESS_KEY')
      AWS.config.accessKeyId = Env('AWSC_ACCESS_KEY_ID')
      return new AwsDynamodb(Env('AWSC_REGION'), Cfg.DB_POSTS)
  }
})()
