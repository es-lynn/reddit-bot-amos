import * as mxp from 'mixpanel'
import {Mixpanel} from 'mixpanel'
import {ErrorStream, EventStream} from "../Logger"

export interface Analytics {
	key: string,
	value: string | number
}

export class MixpanelStream implements EventStream, ErrorStream {

	mixpanel: Mixpanel

	constructor(token: string) {
		this.mixpanel = mxp.init(token)
	}

	send(event: string, properties?: Analytics[]): void {
		let new_properties: any = {}
		properties?.forEach((p)=>{
			new_properties[p.key] = p.value
		})
		this.mixpanel.track(event, {...{distinct_id: 'SERVER', ip: '127.0.0.1'}, ...new_properties})
	}
}
