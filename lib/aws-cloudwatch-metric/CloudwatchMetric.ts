import * as AWS from 'aws-sdk'
import {CloudWatch} from 'aws-sdk'
import {Dimension, MetricData, MetricDatum, StandardUnit} from 'aws-sdk/clients/cloudwatch'

export interface Metric {
	name: string,
	value?: number,
	unit?: StandardUnit
}

export class CloudwatchMetric {
	cw: CloudWatch

	constructor(region: string) {
		this.cw = new AWS.CloudWatch({apiVersion: '2010-08-01', region})
	}

	async put_metric(namespace: string, dimension: Dimension, metrics: Metric[]): Promise<void> {

		let metric_data: MetricDatum[] = []
		metrics.forEach((m) => {
			metric_data.push({
				Dimensions: [dimension],
				MetricName: m.name,
				Unit: m.unit,
				Value: m.value
			})
		})

		let params: CloudWatch.Types.PutMetricDataInput = {
			MetricData: metric_data,
			Namespace: namespace
		}

		return new Promise((resolve, reject) => {
			this.cw.putMetricData(params, (err, data) => {
				if (err) { reject(err) }
				else resolve()
			})
		})
	}
}