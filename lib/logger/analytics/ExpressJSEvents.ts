import {ErrorStream, EventStream, Log, Logger, LogLevel, LogStream} from '../Logger'
import express from 'express'

interface Config {
	port: number
	path?: string
	max: number
}

interface MetaData {
	key: string,
	value: string
}

export class ExpressJSEvents implements EventStream, ErrorStream {
	app = express()
	events: any = {}
	config: Config

	constructor(config: Config) {
		this.config = config
		this.app.listen(config.port, () => console.log(`Event server started: ${config}`))
		this.app.get(`/${config.path}`, (req, res) => {
			res.json(this.events)
		})
	}

	send(id: string, metadata?: MetaData[]): void {
		if (!this.events[id]) {
			this.events[id] = []
		}
		metadata = metadata ? metadata : []
		metadata.push({key:'Time', value:new Date().toISOString()})
		let new_properties: any = {}
		metadata.forEach((p)=>{
			new_properties[p.key] = p.value
		})
		this.events[id].push(new_properties)
	}
}
