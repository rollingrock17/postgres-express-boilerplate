const router = require('express').Router()
const pool = require('../db').getPool()
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const saltRounds = 10

const schema = Joi.object().keys({
	name: Joi.string()
		.alphanum()
		.min(3)
		.max(70)
		.required(),
	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.required(),
	password: Joi.string()
		.regex(/^[a-zA-Z0-9]{3,30}$/)
		.required(),
})

async function routerPost(request, response) {
	let client
	try {
		await Joi.validate(request.body, schema)
		const hash = await bcrypt.hash(request.body.password, saltRounds)
		client = await pool.connect()
		await client.query(
			`
                INSERT INTO wb_user (name, email, password)
                VALUES ($1, $2, $3)
            `,
			[request.body.name, request.body.email, hash]
		)
		response.sendStatus(200)
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
