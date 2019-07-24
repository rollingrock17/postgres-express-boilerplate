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

describe('/password', () => {
	describe('/update', () => {
		it('should update user password', async () => {
			try {
				const payload = {
					oldPassword: password,
					repeatOldPassword: password,
					newPassword: faker.internet.password(),
				}
				const response = await request(
					'password/update',
					payload,
					token
				)
				expect(response).toBe('OK')
			} catch (error) {
				expect(error).toBeUndefined()
			}
		})
	})
})
