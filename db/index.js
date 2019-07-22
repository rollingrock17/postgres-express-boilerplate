const { Pool } = require('pg')

const pool = new Pool()

async function query(text, params) {
	let client
	try {
		client = await pool.connect()
		return client.query(text, params)
	} catch (error) {
		throw error
	} finally {
		if (client) {
			client.release()
		}
	}
}

async function transaction(text, params) {
	let client
	try {
		client = await pool.connect()
		await client.query('BEGIN')
		const response = client.query(text, params)
		await client.query('COMMIT')
		return response
	} catch (error) {
		if (client) {
			await client.query('ROLLBACK')
		}
		throw error
	} finally {
		if (client) {
			client.release()
		}
	}
}

module.exports = {
	query,
	transaction,
}
