import * as AWS from 'aws-sdk'
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import {Database} from "./Database";


export class AwsDynamodb<T extends object> extends Database<T> {
	ddb: DocumentClient

	constructor(region: string, table: string) {
		super(table)
		AWS.config.update({region})
		this.ddb = new AWS.DynamoDB.DocumentClient()
	}

	async select(key: string): Promise<T> {
		const params = {
			TableName: this.table,
			Key: key
		}
		return new Promise((resolve, reject) => {
			this.ddb.scan(params, (err, data) => {
				if (err) {
					reject(err)
				} else if (!data || !data.Items || data.Items.length <= 0) {
					reject(new Error(`No items retrieved from: ${this.table} : ${key}`))
				} else {
					// @ts-ignore
					resolve(data.Items[0])
				}
			})
		})
	}

	async insert(key: string, value: T): Promise<void> {
		const id = { id: key }
		const new_data = {...id, ...value}

		const params = {
			TableName : this.table,
			Item: new_data
		}
		return new Promise((resolve, reject) => {
			this.ddb.put(params, (err, data) => {
				if (err) { reject(err) }
				else { resolve() }
			})
		})
	}

	async scan(): Promise<T[]> {
		return new Promise((resolve, reject) => {
			this.ddb.scan({TableName: this.table}, (err, data) => {
				if (err) {
					reject(err)
				} else if (!data || !data.Items || data.Items.length <= 0) {
					resolve([])
				} else {
					// @ts-ignore
					resolve(data.Items)
				}
			})
		})
	}

	async update(key: string, value: T): Promise<void> {
		const current_data: T = await this.select(key)
		const new_data = {...current_data, ...value}

		await this.insert(key, new_data)
	}
}