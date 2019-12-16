export abstract class Database<T extends object> {

	readonly table: string

	protected constructor(table: string) {
		this.table = table
	}

	abstract async select(key: string): Promise<T>

	abstract async insert(key: string, value: T): Promise<void>

	abstract async update(key: string, value: T): Promise<void>
}