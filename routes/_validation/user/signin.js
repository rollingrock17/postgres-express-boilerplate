const Joi = require('@hapi/joi')
const {
	user: { email, password },
} = require('../constraints')

module.exports = Joi.object().keys({
	email,
	password,
})
