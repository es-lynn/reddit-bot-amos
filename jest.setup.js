require('dotenv').config({ path: './.env.test' })

/* User configurations below */
jest.setTimeout(20000)
require('./lib/ext/prototype/Array')
require('./lib/ext/prototype/String')