Array.prototype.max = function(){
	return Math.max.apply( Math, this )
}

Array.prototype.is_empty = function(){
	return this.length === 0
}

Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)]
}

Array.prototype.first = function() {
	return this[0]
}

Array.prototype.last = function() {
	return this[this.length-1]
}

// @ts-ignore
interface Array<T> {
	max(): number
	is_empty(): boolean
	random(): T
	first(): T
	last(): T
}
