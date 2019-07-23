const request = require('./_request')

// id: 7, name: jayne, email: jayne@ayre.com, password: abcd

describe('/email/count', () => {
	it('should get email count', async () => {
		try {
			const response = await request('email/count', {
				email: 'jayne@ayre.com',
			})
			expect(response.count).toEqual(1)
		} catch (error) {
			expect(error).toBeUndefined()
		}
	})
})
