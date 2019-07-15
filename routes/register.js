const express = require('express')
const router = express.Router()
const pool = require('../db').getPool()

router.post('/', (httpRequest, httpResponse) => {
	pool.connect((poolError, client, done) => {
		if (poolError) {
			httpResponse.sendStatus(500)
		}
		client.query(
			'SELECT * FROM wb_user WHERE id = $1',
			[1],
			(clientError, dbResponse) => {
				done()
				if (clientError) {
					httpResponse.sendStatus(500)
				} else {
					httpResponse.json(dbResponse.rows[0])
				}
			}
		)
	})
})

module.exports = router
