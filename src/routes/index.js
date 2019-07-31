var express = require('express');
var router = express.Router();

// submiddleware
const auth = require('./auth');
// const users = require('./users');

router.use('/auth', auth);
// router.use('/users', users);

module.exports = router;