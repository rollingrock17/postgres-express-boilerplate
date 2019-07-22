const http = require('http')

module.exports = (route, payload, token) =>
	new Promise((resolve, reject) => {
		const postData = JSON.stringify(payload)
		let bytes = ''
		let headers

		if (token) {
			headers = {
				'Content-Type': 'application/json',
				authorization: `bearer ${token}`,
			}
		} else {
			headers = {
				'Content-Type': 'application/json',
			}
		}

		const options = {
			hostname: 'localhost',
			port: 4000,
			path: `/${route}`,
			method: 'POST',
			headers,
		}

		const request = http.request(options, response => {
			response.on('data', chunk => {
				bytes += chunk
			})
			response.on('end', () => {
				try {
					bytes = JSON.parse(bytes)
					resolve(bytes)
				} catch {
					resolve(bytes.toString('utf8'))
				}
			})
		})

		request.on('error', error => {
			reject(error)
		})

		request.write(postData)
		request.end()
	})
