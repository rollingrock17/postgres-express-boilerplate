const request = require('./_request')

// id: 7, name: jayne, email: jayne@ayre.com, password: abcd

describe('/signin', () => {
	it('should sign in user', async () => {
		try {
			const response = await request('signin', {
				email: 'jayne@ayre.com',
				password: 'abcd',
			})
			expect(response.token).toBeDefined()
		} catch (error) {
			expect(error).toBeUndefined()
		}
	})
})
