const router = require('express').Router()
const pool = require('../db').getPool()
const Joi = require('@hapi/joi')
const { email } = require('../helpers/validation-helper')

const schema = Joi.object().keys({
	email,
})

async function routerPost(request, response) {
	let client
	try {
		await Joi.validate(request.body, schema)
		client = await pool.connect()
		const dbResponse = await client.query(
			`
                SELECT COUNT(email)
                FROM wb_user
                WHERE email = $1
            `,
			[request.body.email]
		)
		response.json(dbResponse.rows[0])
	} catch (error) {
		if (error.details) {
			response.sendStatus(400)
		} else {
			response.sendStatus(500)
		}
	} finally {
		if (client) {
			client.release()
		}
	}
}

router.post('/', routerPost)

module.exports = router
