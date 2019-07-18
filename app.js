const express = require('express')
const logger = require('morgan')
const jwt = require('jsonwebtoken')
const app = express()
const register = require('./routes/register')
const email = require('./routes/email')
const signin = require('./routes/signin')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((request, _, next) => {
	try {
		const token = request.headers.authorization.split(' ')[1]
		jwt.verify(token, process.env.TOKENKEY, (_, payload) => {
			if (payload) {
				request.user.email = payload.email
			}
			next()
		})
	} catch {
		next()
	}
})

app.use('/register', register)
app.use('/email', email)
app.use('/signin', signin)

module.exports = app
