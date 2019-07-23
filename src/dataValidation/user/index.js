const Joi = require('@hapi/joi')
const {
	constraints: {
		user: { name, email, password },
	},
} = require('../')

module.exports = {
	registerSchema: Joi.object().keys({
		name,
		email,
		password,
	}),
	signinSchema: Joi.object().keys({
		email,
		password,
	}),
}
