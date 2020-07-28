require('dotenv').config({ path: './.env.testing' })
require('@aelesia/commons-ext').extend.all()

jest.setTimeout(20000)
