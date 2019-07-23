const faker = require('faker')
const request = require('./_request')

// id: 33
// name: Miss Josianne Jacobs
// email: Neal.Ferry88@yahoo.com
// password: Dpk0t750OyznOev

const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzIiwiaWF0IjoxNTYzNzY0Mzc1fQ.rv-DTTM_wzctshvfmW9_KSDXlJ4BD3a-IL4WhJdkq64'

describe('/email/update', () => {
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
