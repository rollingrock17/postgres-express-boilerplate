const bcrypt = require('bcrypt')

async function compare(data, encrypted) {
	if (!(await bcrypt.compare(data, encrypted))) {
		throw 'invalid password'
	}
}

function hash(data) {
	const saltRounds = 10
	return bcrypt.hash(data, saltRounds)
}

module.exports = {
	compare,
	hash,
}
