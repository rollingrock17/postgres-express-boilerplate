const register = require('./user/register')
const emailCount = require('./user/email/count')
const emailUpdate = require('./user/email/update')
const signin = require('./user/signin')
const characterCreate = require('./character/create')

module.exports = app => {
	app.use('/register', register)
	app.use('/email/count', emailCount)
	app.use('/email/update', emailUpdate)
	app.use('/signin', signin)
	app.use('/character/create', characterCreate)
}
