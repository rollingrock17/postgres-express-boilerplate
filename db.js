const { Pool } = require('pg')

let pool

const getPool = () => {
	if (!pool) {
		pool = new Pool()
	}
	return pool
}

module.exports = { getPool }
