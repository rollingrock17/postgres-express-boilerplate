const request = require('./_request')

// id: 33
// name: Miss Josianne Jacobs
// email: Neal.Ferry88@yahoo.com
// password: Dpk0t750OyznOev

const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzIiwiaWF0IjoxNTYzNzY0Mzc1fQ.rv-DTTM_wzctshvfmW9_KSDXlJ4BD3a-IL4WhJdkq64'

describe('/password/update', () => {
	it('should update user password', async () => {
		let payload
		let response
		try {
			payload = {
				oldPassword: 'Dpk0t750OyznOev',
				repeatOldPassword: 'Dpk0t750OyznOev',
				newPassword: 'veOnzyO057t0kpD',
			}
			response = await request('password/update', payload, token)
			expect(response).toBe('OK')
			payload = {
				oldPassword: 'veOnzyO057t0kpD',
				repeatOldPassword: 'veOnzyO057t0kpD',
				newPassword: 'Dpk0t750OyznOev',
			}
			response = await request('password/update', payload, token)
			expect(response).toBe('OK')
		} catch (error) {
			expect(error).toBeUndefined()
		}
	})
})
