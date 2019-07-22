const Joi = require('@hapi/joi')
const {
	auth: { userId },
	character: { name, description },
} = require('../constraints')

module.exports = Joi.object().keys({
	userId,
	name,
	description,
})
