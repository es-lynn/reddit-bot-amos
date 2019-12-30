import {StringUtil} from './StringUtil'

type AnyDate = Date | number | string

export default class Time {

	static now(): Date {
		return new Date()
	}

	static to_date(date?: AnyDate): Date {
		if (date instanceof Date) {
			return date
		} else if (typeof date === 'number') {
			return this.from_number(date)
		} else if (typeof date === 'string') {
			return this.from_number(StringUtil.to_number(date))
		} else if (typeof date === 'undefined') {
			return new Date()
		}
		throw new TypeError(`Time: Unable to parse ${date} to date`)
	}

	private static from_number(timestamp: number): Date {
		if (timestamp <= 99999999999) {
			return new Date(timestamp*1000)
		}
		return new Date(timestamp)
	}

	static utc(date?: AnyDate): number {
		return this.to_date(date).getTime()
	}

	static epoch(date?: AnyDate): number {
		return Math.trunc(this.to_date(date).getTime() / 1000)
	}

	static elapsed(date: AnyDate, date2?: AnyDate): number {
		let date_utc = this.to_date(date).getTime()
		let date2_utc = this.to_date(date2).getTime()
		return Math.abs(date_utc - date2_utc)
	}

	static add(ms: number, date?: AnyDate): Date {
		date = this.to_date(date)
		return new Date(date.getTime() + ms)
	}

	static subtract(ms: number, date?: AnyDate): Date {
		date = this.to_date(date)
		return new Date(date.getTime() - ms)
	}

	/**
	 * Returns true if first date is equal to or before second date OR now()
	 */
	static is_before(date: AnyDate, date2: AnyDate): boolean {
		let date_utc = this.to_date(date).getTime()
		let date2_utc = this.to_date(date2).getTime()
		return date_utc <= date2_utc
	}

	static is_after(date: AnyDate, date2: AnyDate): boolean {
		let date_utc = this.to_date(date).getTime()
		let date2_utc = this.to_date(date2).getTime()
		return date_utc > date2_utc
	}

	static has_passed(date: AnyDate): boolean {
		return this.is_before(date, new Date())
	}

	static ext() {
		Date.prototype.utc = function(): number {
			return Time.utc(this)
		}

		Date.prototype.epoch = function(): number {
			return Time.epoch(this)
		}

		Date.prototype.elapsed = function(date?: AnyDate): number {
			return Time.elapsed(this, date)
		}

		Date.prototype.add = function(ms: number): Date {
			return Time.add(ms, this)
		}

		Date.prototype.subtract = function(ms: number): Date {
			return Time.subtract(ms, this)
		}

		Date.prototype.is_before = function(date: AnyDate): boolean {
			return Time.is_before(this, date)
		}

		Date.prototype.is_after = function(date: AnyDate): boolean {
			return Time.is_after(this, date)
		}

		Date.prototype.has_passed = function(date: AnyDate): boolean {
			return Time.has_passed(this)
		}
	}
}