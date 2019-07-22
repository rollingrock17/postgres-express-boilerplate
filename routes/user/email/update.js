const router = require('express').Router()
const schema = require('../../_validation/user/email/update')
const validate = require('../../_validation/validate')
const { transaction } = require('../../../db')

async function routerPost(request, response, next) {
	try {
		const { email, userId } = await validate(request, schema)
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

router.post('/', routerPost)

module.exports = router
