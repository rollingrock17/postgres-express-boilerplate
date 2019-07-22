const router = require('express').Router()
const schema = require('../../_validation/user/email/count')
const validate = require('../../_validation/validate')
const { query } = require('../../../db')

async function routerPost(request, response, next) {
	try {
		const { email } = await validate(request, schema)
		const dbResponse = await query(
			`
                SELECT COUNT(email)::int
                FROM wb_user
                WHERE email = $1
            `,
			[email]
		)
		response.json(dbResponse.rows[0])
	} catch (error) {
		next(error)
	}
}

router.post('/', routerPost)

module.exports = router
