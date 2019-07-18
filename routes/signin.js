const router = require('express').Router()
const pool = require('../db').getPool()
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const schema = Joi.object().keys({
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
		client = await pool.connect()
		const dbResponse = await client.query(
			`
                SELECT password
                FROM wb_user
                WHERE email = $1
            `,
			[request.body.email]
		)
		const validPassword = await bcrypt.compare(
			request.body.password,
			dbResponse.rows[0].password
		)
		if (validPassword) {
			jwt.sign(
				{ email: request.body.email },
				process.env.TOKENKEY,
				{ algorithm: 'RS256' },
				(error, token) => {
					if (error) {
						response.sendStatus(500)
					} else {
						response.json({ token })
					}
				}
			)
		} else {
			response.sendStatus(400)
		}
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
