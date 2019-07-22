const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const schema = require('../_validation/user/signin')
const validate = require('../_validation/validate')
const { query } = require('../../db')

async function routerPost(request, response, next) {
	try {
		const { email, password } = await validate(request, schema)
		const dbResponse = await query(
			`
                SELECT password, id
                FROM wb_user
                WHERE email = $1
            `,
			[email]
		)
		const validPassword = await bcrypt.compare(
			password,
			dbResponse.rows[0].password
		)
		if (validPassword) {
			jwt.sign(
				{ id: dbResponse.rows[0].id },
				process.env.TOKENKEY,
				{ algorithm: 'HS256' },
				(error, token) => {
					if (error) {
						next(error)
					} else {
						response.json({ token })
					}
				}
			)
		} else {
			throw 'invalid password'
		}
	} catch (error) {
		next(error)
	}
}

router.post('/', routerPost)

module.exports = router
