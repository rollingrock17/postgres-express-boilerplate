const Joi = require('@hapi/joi')
const {
	constraints: {
		auth: { userId },
		user: { password },
	},
} = require('../../')

module.exports = {
	updateSchema: Joi.object().keys({
		userId,
		oldPassword: password,
		repeatOldPassword: password,
		newPassword: password,
	}),
}
