const Joi = require('@hapi/joi')

const options = { allowUnknown: true }

const validate = (request, schema) =>
	Joi.validate(request.body, schema, options)

const constraints = {
	auth: {
		userId: Joi.string().required(),
	},
	user: {
		name: Joi.string()
			.trim()
			.min(3)
			.max(70)
			.required(),
		email: Joi.string()
			.trim()
			.email({ minDomainSegments: 2 })
			.lowercase()
			.required(),
		password: Joi.string()
			.min(3)
			.max(30)
			.regex(/\s/, { invert: true })
			.required(),
	},
}

module.exports = {
	validate,
	constraints,
}
