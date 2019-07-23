const express = require('express')
const logger = require('morgan')
const jwt = require('jsonwebtoken')
const helmet = require('helmet')
const routes = require('./src/routes')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

app.use((request, _, next) => {
	try {
		const token = request.headers.authorization.split(' ')[1]
		jwt.verify(token, process.env.TOKENKEY, (_, payload) => {
			if (payload) {
				request.body.userId = payload.id
			} else {
				delete request.body.userId
			}
			next()
		})
	} catch {
		delete request.body.userId
		next()
	}
})

routes(app)

app.use((error, _, response, __) => {
	console.error(error)
	const { message, stack } = error
	response.status(500).json({ message, stack })
})

module.exports = app
