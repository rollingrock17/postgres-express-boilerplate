var express = require('express');
var router = express.Router();

router.get('/*', (req, res) => res.json({ user: 'userinfo' }));

module.exports = router;
