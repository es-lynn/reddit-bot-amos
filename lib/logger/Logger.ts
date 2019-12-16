import {UninitializedError} from '../ext/Errors'
import {Metric} from '../aws-cloudwatch-metric/CloudwatchMetric'
import {Time} from '../ext/Time'

export enum LogLevel {
	SILENT,
	TRACE,
	DEBUG,
	INFO,
	WARN,
	ERROR,
	FATAL
}

export interface Log {
	context: string,
	timestamp: Date,
	elapsed?: number,
	msg?: string | object,
	error?: Error,
	level: LogLevel
}

// IDEA: Consider sending only {Log} to streams
// FIXME: Consider breaking up before Builders, Loggers & After Log Events
export interface LogStream {
	send(log: Log): void
}
export interface EventStream {
	send(id: string, metadata?: {key:string, value:string|number}[]): void
}
export interface ErrorStream {
	send(id: string, metadata?: {key:string, value:string}[]): void
}
export interface TimingStream {
	send(id: string, metric: Metric[]): void
}

export class Logger {
	private id: string = ''
	private _log_streams: LogStream[] = []
	private _event_streams: EventStream[] = []
	private _error_streams: ErrorStream[] = []
	// FIXME: Use a different name
	private _timing_streams: TimingStream[] = []


	// IDEA: Consider having attributes (eg. start time, id, context, etc.)
	// that was the original idea wasn't it?
	private start_time: Date | undefined = undefined
	private _log: Log = null as any

	private clone(): Logger {
		let logger = new Logger()
		logger.id = this.id
		logger._log_streams = this._log_streams
		logger._event_streams = this._event_streams
		logger._error_streams = this._error_streams
		logger._timing_streams = this._timing_streams
		logger._log = this._log
		return logger
	}

	add_log_streams(..._streams: LogStream[]): Logger {
		let logger = this.clone()
		logger._log_streams = _streams
		return logger
	}

	add_event_streams(..._streams: EventStream[]): Logger {
		let logger = this.clone()
		logger._event_streams = _streams
		return logger
	}

	add_error_streams(..._streams: ErrorStream[]): Logger {
		let logger = this.clone()
		logger._error_streams = _streams
		return logger
	}

	add_timing_streams(..._streams: TimingStream[]): Logger {
		let logger = this.clone()
		logger._timing_streams = _streams
		return logger
	}


	start_timer(): Logger {
		let logger = this.clone()
		logger.start_time = new Date()
		return logger
	}

	silent(context: string, msg: string | object): Logger {
		return this.log(context, msg, LogLevel.SILENT)
	}

	debug(context: string, msg: string | object): Logger {
		return this.log(context, msg, LogLevel.DEBUG)
	}

	info(context: string, msg: string | object): Logger {
		return this.log(context, msg, LogLevel.INFO)
	}

	warn(context: string, msg: string | object): Logger {
		return this.log(context, msg, LogLevel.WARN)
	}

	error(context: string, msg: string | object): Logger {
		return this.log(context, msg, LogLevel.ERROR)
	}

	fatal(context: string, msg: string | object): Logger {
		return this.log(context, msg, LogLevel.FATAL)
	}

	log(context: string, comment: string | object | Error , level: LogLevel): Logger {
		let msg
		let e = undefined
		if (comment instanceof Error) {
			msg = JSON.stringify(comment)
			e = comment
		} else {
			msg = comment
		}

		let logger = this.clone()
		logger._log = {
			context,
			msg,
			timestamp: new Date(),
			error: e,
			level,
			elapsed: this.start_time ? Time.elapsed_ms(this.start_time) : undefined
		}
		if (logger._log.level !== LogLevel.SILENT) {
			logger._log_streams.forEach((stream) => {
				stream.send(logger._log)
			})
		}
		return logger
	}

	// IDEA: Consider sending metadata as JSON
	// event(name: string, metadata?: {key: string, value: string}): Logger {
	//
	// 	if (this._log==null) throw new UninitializedError('Log not yet initialized. Did you forget to call debug/info/warn/error before this?')
	//
	// 	this._event_streams.forEach((stream)=> {
	// 		let metadata_array = metadata ? [metadata] : undefined
	// 		stream.send(name, metadata_array)
	// 	})
	// 	return this
	// }

	// event_(): Logger {
	// 	// FIXME: Not a good solution
	// 	if (this._log==null) throw new UninitializedError('Log not yet initialized. Did you forget to call debug/info/warn/error before this?')
	//
	// 	this._event_streams.forEach((stream)=> {
	// 		stream.send(this._log.context)
	// 	})
	// 	return this
	// }

	count(num?: number): Logger {
		// FIXME: Not a good solution
		if (this._log==null) throw new UninitializedError('Log not yet initialized. Did you forget to call debug/info/warn/error before this?')

		this._event_streams.forEach((stream)=> {
			stream.send(this._log.context, [{key:'Count', value:num??1}])
		})
		return this
	}


	// e(name: string, metadata?: {key: string, value: string}): Logger {
	// 	if (this._log==null) throw new UninitializedError('Log not yet initialized. Did you forget to call debug/info/warn/error before this?')
	//
	// 	this._error_streams.forEach((stream)=>{
	// 		let metadata_array = metadata ? [metadata] : undefined
	// 		stream.send(name, metadata_array)
	// 	})
	// 	return this
	// }

	// FIXME: Use a nicer name
	e(e?: Error): Logger {
		if (this._log==null) throw new UninitializedError('Log not yet initialized. Did you forget to call debug/info/warn/error before this?')
		let error = e ?? this._log.error ?? {name: 'UnknownError', message: ''}

		this._error_streams.forEach((stream)=> {
			stream.send(`${this._log.context}_${LogLevel[this._log.level]}`, [{key:'Error', value:error.name}])
		})
		return this
	}

	// FIXME: Use a nicer name
	track_time(): Logger {
		if (this._log==null) throw new UninitializedError('Log not yet initialized. Did you forget to call debug/info/warn/error before this?')
		if (this._log.elapsed==null) throw new UninitializedError('Timing not yet initialized. Did you forget to call Logger.start_timer()?')
		this._timing_streams.forEach((stream)=> {
			stream.send(this._log.context, [{
				name: 'ExecutionTime',
				value: this._log.elapsed,
				unit: 'Milliseconds'
			}])
		})
		return this
	}
}

export default new Logger()