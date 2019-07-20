const express = require('express')
const logger = require('morgan')
const jwt = require('jsonwebtoken')
const helmet = require('helmet')
const app = express()
const register = require('./routes/register')
const email = require('./routes/email')
const signin = require('./routes/signin')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

app.use((request, _, next) => {
	try {
		const token = request.headers.authorization.split(' ')[1]
		jwt.verify(token, process.env.TOKENKEY, (_, payload) => {
			if (payload) {
				request.user_id = payload.id
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
