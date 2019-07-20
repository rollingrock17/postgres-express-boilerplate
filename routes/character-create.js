const router = require('express').Router()
const pool = require('../db').getPool()
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { email, password } = require('../helpers/validation-helper')

const schema = Joi.object().keys({
	email,
	password,
})

async function routerPost(request, response) {
	let client
	try {
		await Joi.validate(request.body, schema)
		client = await pool.connect()
		const dbResponse = await client.query(
			`
                SELECT password, id
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
				{ id: dbResponse.rows[0].id },
				process.env.TOKENKEY,
				{ algorithm: 'HS256' },
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
