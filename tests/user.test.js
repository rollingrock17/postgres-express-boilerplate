const faker = require('faker')
const request = require('./_request')

const name = faker.name.findName()
const email = faker.internet.email()
const password = faker.internet.password()

beforeAll(async () => {
	await request('register', { name, email, password })
})

describe('/', () => {
	describe('/register', () => {
		it('should register new user', async () => {
			try {
				const payload = {
					name: faker.name.findName(),
					email: faker.internet.email(),
					password: faker.internet.password(),
				}
				const response = await request('register', payload)
				expect(response).toBe('OK')
			} catch (error) {
				expect(error).toBeUndefined()
			}
		})
	})
	describe('/signin', () => {
		it('should sign in user', async () => {
			try {
				const payload = {
					email,
					password,
				}
				const response = await request('signin', payload)
				expect(response.token).toBeDefined()
			} catch (error) {
				expect(error).toBeUndefined()
			}
		})
	})
})
