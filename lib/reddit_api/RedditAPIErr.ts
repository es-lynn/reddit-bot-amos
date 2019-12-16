export namespace RedditAPIErr {
	export class General extends Error {
		constructor(msg: string) {
			super(msg)
			this.name = 'RedditAPIGeneralError'
			Object.setPrototypeOf(this, General.prototype)
		}
	}

	export class PostLimit extends General {
		constructor(msg: string) {
			super(msg)
			this.name = 'RedditAPIPostLimitError'
			Object.setPrototypeOf(this, PostLimit.prototype)
		}
	}
}