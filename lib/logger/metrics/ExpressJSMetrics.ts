import express from 'express'
import * as core from 'express-serve-static-core'
import {Metric} from '../../aws-cloudwatch-metric/CloudwatchMetric'
import {TimingStream} from '../Logger'

interface Config {
	port: number
	path?: string
	max: number
}

export class ExpressJSMetrics implements TimingStream {
	app: core.Express = express()
	config: Config
	metrics: any = {}

	constructor(config: Config) {
		this.config = config
		this.app.listen(config.port, () => console.log(`Metrics server started: ${config}`))
		this.app.get('/metrics', (req, res) => {
			res.json(this.metrics)
		})
	}

	send(id: string, metrics: Metric[]) {
		let obj = this.metrics[id]
		if (!obj) {
			this.metrics[id] = {}
		}
		metrics.forEach((metric) => {
			let array = this.metrics[id][metric.name]
			if (!array) {
				array = this.metrics[id][metric.name] = []
			}
			array.push(metric.value)
		})
	}
}
