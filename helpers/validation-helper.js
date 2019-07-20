const Joi = require('@hapi/joi')

const name = Joi.string()
	.alphanum()
	.min(3)
	.max(70)
	.required()

const email = Joi.string()
	.email({ minDomainSegments: 2 })
	.required()

const password = Joi.string()
	.regex(/^[a-zA-Z0-9]{3,30}$/)
	.required()

module.exports = {
	name,
	email,
	password,
}
