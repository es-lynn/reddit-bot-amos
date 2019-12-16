import {Log, Logger, LogLevel, LogStream} from '../Logger'
import {Chalk} from "chalk";
const chalk = require('chalk')

export class ConsoleStream implements LogStream {

	send(log: Log) {
		switch(log.level) {
			case LogLevel.TRACE: console.debug(ConsoleStream._s(log))
				break
			case LogLevel.DEBUG: console.debug(ConsoleStream._s(log))
				break
			case LogLevel.INFO: console.info(ConsoleStream._s(log))
				break
			case LogLevel.WARN: console.warn(ConsoleStream._s(log))
				break
			case LogLevel.ERROR: console.error(ConsoleStream._s(log))
				break
			case LogLevel.FATAL: console.error(ConsoleStream._s(log))
				break
		}
	}

	static stringify(obj: Object | string | undefined): string | undefined {
		if (typeof obj === 'object') {
			return JSON.stringify(obj)
		}
		return obj
	}

	static _s(log: Log): string {
		return `${chalk.gray(log.timestamp.toLocaleString())}` +
			` ${this.log_level(log)}` +
			` ${log.elapsed != undefined ? this.left_pad(log.elapsed + 'ms', 7) : this.left_pad('', 7)}` +
			` ${chalk.green(this.right_pad(log.context, 20))}` +
			` ${this.print_msg(log.msg)}`
	}

	static log_level(log: Log): Chalk | string {
		switch (log.level) {
			case LogLevel.INFO:
				return chalk.gray(' INFO')
			case LogLevel.WARN:
				return chalk.yellow(' WARN')
			case LogLevel.ERROR:
				return chalk.red('ERROR')
			case LogLevel.FATAL:
				return chalk.bgRed('FATAL')
			default:
				return ''
		}
	}

	static print_msg(msg: string | object | undefined): Chalk | string {
		if (!msg) return ''
		if (typeof msg === 'object') {
			msg = JSON.stringify(msg)
			msg = ConsoleStream.remove(msg, '{', '}', '"')
			msg = ConsoleStream.replace_all(msg, ',', ', ')
		}
		return chalk.white(msg)
	}

	static replace_all(str: string, search: string, replacement: string): string {
		return str.replace(new RegExp(search, 'g'), replacement)
	}

	static remove(original: string, ...char: string[]): string {
		let str = original
		for (let i=0; i< char.length; i++) {
			str = ConsoleStream.replace_all(str, char[i], '')
		}
		return str
	}

	static left_pad(str: string, length: number): string {
		let a = length - str.length
		let b = ''
		for (let i=0; i <a; i++) {
			b+=' '
		}
		return b+str
	}

	static right_pad(str: string, length: number): string {
		let a = length - str.length
		let b = str
		for (let i=0; i <a; i++) {
			b+=' '
		}
		return b
	}
}
