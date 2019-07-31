var express = require('express');
var router = express.Router();

// controllers
const {
    create,
    update,
    getAll,
    findOne
} = require('../controllers/users');

const {
    auth
} = require('../controllers/auth');

router.use(auth.authorize);


module.exports = router;