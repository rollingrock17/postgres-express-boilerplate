const Joi = require('@hapi/joi')

module.exports = {
	auth: {
		userId: Joi.string().required(),
	},
	user: {
		name: Joi.string()
			.min(3)
			.max(70)
			.trim()
			.required(),
		email: Joi.string()
			.email({ minDomainSegments: 2 })
			.lowercase()
			.trim()
			.required(),
		password: Joi.string()
			.min(3)
			.max(30)
			.regex(/\s/, { invert: true })
			.required(),
	},
	character: {
		name: Joi.string()
			.min(3)
			.max(70)
			.trim()
			.required(),
		description: Joi.string()
			.trim()
			.default(null),
		image_url: Joi.string()
			.uri()
			.max(200)
			.trim(),
	},
}
