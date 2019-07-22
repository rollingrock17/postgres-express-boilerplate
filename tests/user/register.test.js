const faker = require('faker')
const request = require('../request')

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
