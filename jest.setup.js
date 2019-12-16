require('dotenv').config({ path: './.env.test' })

/* User configurations below */
jest.setTimeout(20000)
require('./lib/ext/Array')
require('./lib/ext/String')