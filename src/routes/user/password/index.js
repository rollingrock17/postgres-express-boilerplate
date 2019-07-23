const router = require('express').Router()
const { compare, hash } = require('../../../utils')
const { query, transaction } = require('../../../db')
const { updateSchema } = require('../../../dataValidation/user/password')
const { validate } = require('../../../dataValidation')

async function update(request, response, next) {
	try {
		const {
			userId,
			oldPassword,
			repeatOldPassword,
			newPassword,
		} = await validate(request, updateSchema)
		if (oldPassword !== repeatOldPassword || oldPassword === newPassword) {
			throw 'invalid password'
		}
		const { rows } = await query(
			`
                SELECT password
                FROM wb_user
                WHERE id = $1
            `,
			[userId]
		)
		await compare(oldPassword, rows[0].password)
		const hashedPassword = await hash(newPassword)
		await transaction(
			`
                UPDATE wb_user
                SET password = $1
                WHERE id = $2
            `,
			[hashedPassword, userId]
		)
		response.sendStatus(200)
	} catch (error) {
		next(error)
	}
}

router.post('/update', update)

module.exports = router
