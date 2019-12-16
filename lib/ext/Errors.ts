// TODO: Allow objects to be passed in

export class NotImplementedError extends Error {
	constructor(msg?: string) {
		super(`NotImplementedError: ${msg}`)
		Object.setPrototypeOf(this, NotImplementedError.prototype)
	}
}

export class UninitializedError extends Error {
	constructor(msg?: string) {
		super(`UninitializedError: ${msg}`)
		Object.setPrototypeOf(this, UninitializedError.prototype)
	}
}

export class InvalidArgumentError extends TypeError {
	constructor(msg?: string) {
		super(`InvalidArgumentError: ${msg}`)
		Object.setPrototypeOf(this, InvalidArgumentError.prototype)
	}
}