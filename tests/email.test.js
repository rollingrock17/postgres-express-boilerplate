const faker = require('faker')
const request = require('./_request')

const name = faker.name.findName()
const email = faker.internet.email()
const password = faker.internet.password()
let token

beforeAll(async () => {
	await request('register', { name, email, password })
	const response = await request('signin', { email, password })
	token = response.token
})

describe('/email', () => {
	describe('/count', () => {
		it('should get email count', async () => {
			try {
				const response = await request('email/count', {
					email,
				})
				expect(response.count).toEqual(1)
			} catch (error) {
				expect(error).toBeUndefined()
			}
		})
	})
	describe('/update', () => {
		it('should update user email address', async () => {
			try {
				const payload = {
					email: faker.internet.email(),
				}
				const response = await request('email/update', payload, token)
				expect(response).toBe('OK')
			} catch (error) {
				expect(error).toBeUndefined()
			}
		})
	})
})
