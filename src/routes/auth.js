var express = require('express');
var router = express.Router();
const {
    login,
    signup,
    auth
} = require('../controllers/auth');

// middleware authorization
router.use('/user', auth.authorize);
router.use('/admin', auth.authorize);

router.post('/login', login);
router.post('/signup', signup);

router.get('/user', auth.user);
router.get('/admin', auth.admin);

module.exports = router;