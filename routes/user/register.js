const bcrypt = require('bcrypt')
const router = require('express').Router()
const schema = require('../_validation/user/register')
const validate = require('../_validation/validate')
const { transaction } = require('../../db')

async function routerPost(request, response, next) {
	try {
		const { name, email, password } = await validate(request, schema)
		const saltRounds = 10
		const hash = await bcrypt.hash(password, saltRounds)
		await transaction(
			`
                INSERT INTO wb_user (name, email, password)
                VALUES ($1, $2, $3)
            `,
			[name, email, hash]
		)
		response.sendStatus(200)
	} catch (error) {
		next(error)
	}
}

router.post('/', routerPost)

module.exports = router
