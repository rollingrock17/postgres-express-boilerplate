const router = require('express').Router()
const { query, transaction } = require('../../../db')
const {
	countSchema,
	updateSchema,
} = require('../../../dataValidation/user/email')
const { validate } = require('../../../dataValidation')

async function count(request, response, next) {
	try {
		const { email } = await validate(request, countSchema)
		const { rows } = await query(
			`
                SELECT COUNT(email)::int
                FROM wb_user
                WHERE email = $1
            `,
			[email]
		)
		response.json(rows[0])
	} catch (error) {
		next(error)
	}
}

async function update(request, response, next) {
	try {
		const { email, userId } = await validate(request, updateSchema)
		await transaction(
			`
                UPDATE wb_user
                SET email = $1
                WHERE id = $2
            `,
			[email, userId]
		)
		response.sendStatus(200)
	} catch (error) {
		next(error)
	}
}

router.post('/count', count)
router.post('/update', update)

module.exports = router
