const Pool = require('pg').Pool;

let pool;

const getPool = () => {
	if (!pool) {
		pool = new Pool();
	}
	return pool;
};

module.exports = getPool;
