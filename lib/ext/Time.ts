export class Time {
	static now(): Date {
		return new Date()
	}

	static epoch(): number {
		return new Date().getTime()/1000
	}

	static date(epoch: number): Date {
		return new Date(epoch*1000)
	}

	static elapsed_ms(start: Date): number {
		return new Date().getTime() - start.getTime()
	}

	static elapsed(start: Date | number, end?: Date | number): number {
		let _start
		if (start instanceof Date) {_start = Time.epoch()}
		else { _start = start }

		let _end
		if (end instanceof Date) {_end = end.getTime()/1000}
		else if (typeof end === 'number') { _end = end }
		else { _end = Time.epoch()}

		return this._elapsed(_start, _end)
	}

	private static _elapsed(start: number, end: number): number {
		return Math.abs(end - start)
	}

	static add(seconds: number): Date {
		return this.date(new Date().getTime() + seconds*1000)
	}

	static is_after(date: Date): boolean {
		return new Date().getTime() > date.getTime()
	}

	static is_before(date: Date): boolean {
		return new Date().getTime() <= date.getTime()
	}
}