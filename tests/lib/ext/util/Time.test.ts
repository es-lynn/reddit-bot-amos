import Time from '../../../../lib/ext/util/Time'

describe('Time', () => {

	test('to_date', async () => {
		let date = new Date(1576598796000)
		expect(Time.to_date(date)).toEqual(date)
		expect(Time.to_date(1576598796000)).toEqual(date)
		expect(Time.to_date(1576598796)).toEqual(date)
		expect(Time.to_date(1576598795)).not.toEqual(date)
		expect(Time.to_date('1576598796000')).toEqual(date)
		expect(Time.to_date('1576598796')).toEqual(date)
		expect(Time.to_date('1576598795')).not.toEqual(date)
		expect(Time.to_date()).toBeInstanceOf(Date)
		// FIXME: expect(Time.to_date()).toEqual(new Date())
	})

	test('invalid to_date', async () => {
		expect(()=> Time.to_date('abc')).toThrow(TypeError)
		expect(()=> Time.to_date('123a')).toThrow(TypeError)
		expect(()=> Time.to_date(null as any)).toThrow(TypeError)
		expect(()=> Time.to_date(true as any)).toThrow(TypeError)
	})

	test('utc/epoch', async () => {
		let date = new Date(1576598796987)
		expect(Time.utc(date)).toEqual(1576598796987)
		expect(Time.epoch(date)).toEqual(1576598796)
	})

	test('add/elapsed', async () => {
		let date = Time.now()
		let date2 = Time.add(61234, date)
		expect(Time.elapsed(date, date2)).not.toEqual(61233)
		expect(Time.elapsed(date, date2)).not.toEqual(61235)
		expect(Time.elapsed(date, date2)).toEqual(61234)
		expect(Time.elapsed(date2, date)).toEqual(61234)
	})

	test('subtract/elapsed', async () => {
		let date = Time.now()
		let date2 = Time.subtract(39280, date)
		expect(Time.elapsed(date, date2)).not.toEqual(39279)
		expect(Time.elapsed(date, date2)).not.toEqual(39281)
		expect(Time.elapsed(date, date2)).toEqual(39280)
		expect(Time.elapsed(date2, date)).toEqual(39280)
	})

	test('before', async () => {
		let date = Time.now()
		let date2 = Time.add(1, date)
		expect(Time.is_before(date, date)).toBeTruthy()
		expect(Time.is_before(date, date2)).toBeTruthy()
		expect(Time.is_before(date2, date)).not.toBeTruthy()
	})

	test ('before now()', async () =>{
		let date = Time.now()
		expect(Time.is_before(date, Time.now())).toBeTruthy()
	})

	test('after', async () => {
		let date = Time.now()
		let date2 = Time.add(1, date)
		expect(Time.is_after(date, date2)).not.toBeTruthy()
		expect(Time.is_after(date2, date)).toBeTruthy()
	})

	test ('after now()', async () =>{
		let date = Time.add(99999)
		expect(Time.is_after(date, Time.now())).toBeTruthy()
	})

	test ('has passed', async ()=>{
		expect(Time.has_passed(Time.to_date(1576598796000))).toBeTruthy()
		expect(Time.has_passed(Time.to_date(1576598796))).toBeTruthy()
		expect(Time.has_passed(Time.to_date(9976598796))).not.toBeTruthy()
	})
})
