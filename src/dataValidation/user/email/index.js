const Joi = require('@hapi/joi')
const {
	constraints: {
		auth: { userId },
		user: { email },
	},
} = require('../../')

module.exports = {
	countSchema: Joi.object().keys({
		email,
	}),
	updateSchema: Joi.object().keys({
		userId,
		email,
	}),
}
