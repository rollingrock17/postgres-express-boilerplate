const router = require('express').Router()
const schema = require('../_validation/character/create')
const validate = require('../_validation/validate')
const { transaction } = require('../../db')

async function routerPost(request, response, next) {
	try {
		const { name, description, userId } = await validate(request, schema)
		await transaction(
			`
                INSERT INTO wb_character
                (
                    name,
                    description,
                    user_id
                )
                VALUES ($1, $2, $3)
            `,
			[name, description, userId]
		)
		response.sendStatus(200)
	} catch (error) {
		next(error)
	}
}

router.post('/', routerPost)

module.exports = router
