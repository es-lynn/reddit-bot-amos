describe('Describe', () => {

	test('Test Pass', async () => {
		expect('1').toBe('1')
	})

	test('Test Fail', async () => {
		expect('1').toBe('2')
	})
})
