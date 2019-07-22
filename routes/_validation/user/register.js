const Joi = require('@hapi/joi')
const {
	user: { name, email, password },
} = require('../constraints')

module.exports = Joi.object().keys({
	name,
	email,
	password,
})
