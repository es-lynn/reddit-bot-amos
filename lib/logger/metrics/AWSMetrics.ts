import {CloudwatchMetric, Metric} from '../../aws-cloudwatch-metric/CloudwatchMetric'
import {TimingStream} from '../Logger'

export class AWSMetrics implements TimingStream {

	cloudwatch: CloudwatchMetric
	service: string

	constructor(service: string, region: string) {
		this.service = service
		this.cloudwatch = new CloudwatchMetric(region)
	}

	// TODO: It should not use dimensions anymore
	send(id: string, metrics: Metric[]): void {
		this.cloudwatch.put_metric(this.service,
			{Name: id.split('.')[0], Value: id.split('.')[1]}, metrics)
	}
}
