import {Log, Logger, LogLevel, LogStream} from '../Logger'
import express from 'express'

interface Config {
	port: number
	path?: string
	max: number
}

export class ExpressJS implements LogStream {
	app = express()
	logs: string[] = []
	config: Config

	constructor(config: Config) {
		this.config = config
		this.app.listen(config.port, () => console.log(`Logging server started: ${config}`))
		this.app.get(`/${config.path}`, (req, res) => {
			res.json(this.logs)
		})
	}

	send(log: Log) {
		this.logs.push(ExpressJS._s(log))
		if (this.logs.length > this.config.max) {
			this.logs.shift()
		}
	}

	static _s(log: Log): string {
		return `[${log.timestamp}]` +
			` [${LogLevel[log.level]}]` +
			` [${log.context}]` +
			` [${log.elapsed != undefined ? log.elapsed + 'ms' : ''}]` +
			` ${log.msg}`
	}
}
