const Joi = require('@hapi/joi')

const options = { allowUnknown: true }

module.exports = (request, schema) =>
	Joi.validate(request.body, schema, options)
