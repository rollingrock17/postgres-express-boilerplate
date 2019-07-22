const Joi = require('@hapi/joi')
const {
	user: { email },
} = require('../../constraints')

module.exports = Joi.object().keys({
	email,
})
