const user = require('./user')
const email = require('./user/email')
const password = require('./user/password')

module.exports = app => {
	app.use('/', user)
	app.use('/email', email)
	app.use('/password', password)
}
