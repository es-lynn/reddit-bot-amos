import {Database} from './Database'

export class DBHash<T extends object> extends Database<T> {

	db: any
	constructor(table: string) {
		super(table)
		this.db = {}
	}

	// TODO: Handle table doesn't exist
	async insert(key: string, value: T): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			// await sleep(1)
			if (!this.db[this.table]) {
				this.db[this.table] = {}
			}
			this.db[this.table][key] = value
			// console.log(`[DB] [${table}] Inserted ${key}`)
			resolve()
		})
	}

	async scan(): Promise<T[]> {
		if (!this.db[this.table]) {
			this.db[this.table] = {}
			return []
		}
		let rows = this.db[this.table]
		return Object.keys(rows).map((key)=>{
			return Object.assign({key}, rows[key])
		})
	}

	// TODO: Handle table / key doesn't exist
	async select(key: string): Promise<T> {
		return new Promise<any>((resolve, reject) => {
			// await sleep(1)
			// console.log(`[DB] [${table}] Selected ${key}`)
			let value = this.db[this.table][key]
			if (value)
				resolve(value)
			else
				reject(`[DB] [${this.table}] No such value: ${key}`)
		})
	}

	// TODO: Handle table / key doesn't exist
	async update(key: string, value: T): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			// await sleep(1)
			const data = this.db[this.table][key]
			const updated_on = { updated_on: new Date().toUTCString() }
			const new_data = {...data, ...value, updated_on}
			this.db[this.table][key] = new_data
			console.log(`[DB] [${this.table}] Updated ${key} : ${JSON.stringify(value)}`)
			resolve()
		})
	}

	async commit(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			throw Error('not implemented yet')
		})
	}

	print() {
		console.log(this.db[this.table])
	}

}