String.prototype.lines = function(): string[] {
	return this.split('\n')
}

String.prototype.replace_all = function(search: string, replacement: string): string {
	return this.replace(new RegExp(search, 'g'), replacement)
}

String.prototype.remove = function(...char: string[]): string {
	let str = this.toString()
	for (let i=0; i< char.length; i++) {
		str = str.replace_all(char[i], '')
	}
	return str
}

String.prototype._i = function(): number {
	return Number.parseInt(this.toString())
}

String.prototype._json = function<T>(): T {
	return JSON.parse(this.toString())
}

String.prototype.sec = function(): number {
	return Number.parseInt(this.toString()) * 1000
}

String.prototype.min = function(): number {
	return Number.parseInt((this.toString())) * 60*1000
}

String.prototype.hour = function(): number {
	return Number.parseInt((this.toString())) * 60*60*1000
}

String.prototype.day = function(): number {
	return Number.parseInt((this.toString())) * 24*60*60*1000
}

// @ts-ignore
interface String {
	lines(): string[]
	replace_all(search: string, replacement: string): string
	remove(...char: string[]): string

	_i(): number
	_json<T>(): T

	sec(): number
	min(): number
	hour(): number
	day(): number
}
