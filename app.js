const express = require('express')
const logger = require('morgan')
const register = require('./routes/register')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/register', register)

module.exports = app
