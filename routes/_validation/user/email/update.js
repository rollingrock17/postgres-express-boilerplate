const Joi = require('@hapi/joi')
const {
	auth: { userId },
	user: { email },
} = require('../../constraints')

module.exports = Joi.object().keys({
	userId,
	email,
})
