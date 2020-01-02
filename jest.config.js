module.exports = {
	'roots': [
		'<rootDir>/tests'
	],
	setupFiles: ['dotenv/config'],
	setupFilesAfterEnv: ['./jest.setup.js'],
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testRegex:
		'(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	// testPathIgnorePatterns: ['/node_modules/','RedditAPI.test.ts']
	testPathIgnorePatterns: ['/node_modules/']
}
