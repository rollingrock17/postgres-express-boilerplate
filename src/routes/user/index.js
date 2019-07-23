const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { compare, hash } = require('../../utils')
const { query, transaction } = require('../../db')
const { signinSchema, registerSchema } = require('../../dataValidation/user')
const { validate } = require('../../dataValidation')

async function signin(request, response, next) {
	try {
		const { email, password } = await validate(request, signinSchema)
		const { rows } = await query(
			`
                SELECT password, id
                FROM wb_user
                WHERE email = $1
            `,
			[email]
		)
		await compare(password, rows[0].password)
		jwt.sign(
			{ id: rows[0].id },
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
	} catch (error) {
		next(error)
	}
}

async function register(request, response, next) {
	try {
		const { name, email, password } = await validate(
			request,
			registerSchema
		)
		const hashedPassword = await hash(password)
		await transaction(
			`
                INSERT INTO wb_user (name, email, password)
                VALUES ($1, $2, $3)
            `,
			[name, email, hashedPassword]
		)
		response.sendStatus(200)
	} catch (error) {
		next(error)
	}
}

router.post('/signin', signin)
router.post('/register', register)

module.exports = router
