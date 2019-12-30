require('../../../../lib/ext/prototype/String')
require('../../../../lib/ext/prototype/Date')
import Time from '../../../../lib/ext/util/Time'
Time.ext()

describe('Time', () => {

	test('utc/epoch', async () => {
		let date = new Date(1576598796987)
		expect(date.utc()).toEqual(1576598796987)
		expect(date.epoch()).toEqual(1576598796)
	})

	test('add/elapsed', async () => {
		let date = Time.now()
		let date2 = date.add(61234)
		expect(date.elapsed(date2)).not.toEqual(61233)
		expect(date.elapsed(date2)).not.toEqual(61235)
		expect(date.elapsed(date2)).toEqual(61234)
		expect(date2.elapsed(date)).toEqual(61234)
	})
	//
	// test('subtract/elapsed', async () => {
	// 	let date = Time.now()
	// 	let date2 = Time.subtract(39280, date)
	// 	expect(Time.elapsed(date, date2)).not.toEqual(39279)
	// 	expect(Time.elapsed(date, date2)).not.toEqual(39281)
	// 	expect(Time.elapsed(date, date2)).toEqual(39280)
	// 	expect(Time.elapsed(date2, date)).toEqual(39280)
	// })
	//
	// test('before', async () => {
	// 	let date = Time.now()
	// 	let date2 = Time.add(1, date)
	// 	expect(Time.is_before(date, date)).toBeTruthy()
	// 	expect(Time.is_before(date, date2)).toBeTruthy()
	// 	expect(Time.is_before(date2, date)).not.toBeTruthy()
	// })
	//
	// test ('before now()', async () =>{
	// 	let date = Time.now()
	// 	expect(Time.is_before(date, Time.now())).toBeTruthy()
	// })
	//
	// test('after', async () => {
	// 	let date = Time.now()
	// 	let date2 = Time.add(1, date)
	// 	expect(Time.is_after(date, date2)).not.toBeTruthy()
	// 	expect(Time.is_after(date2, date)).toBeTruthy()
	// })
	//
	// test ('after now()', async () =>{
	// 	let date = Time.add(99999)
	// 	expect(Time.is_after(date, Time.now())).toBeTruthy()
	// })
	//
	// test ('has passed', async ()=>{
	// 	expect(Time.has_passed(Time.to_date(1576598796000))).toBeTruthy()
	// 	expect(Time.has_passed(Time.to_date(1576598796))).toBeTruthy()
	// 	expect(Time.has_passed(Time.to_date(9976598796))).not.toBeTruthy()
	// })
})
