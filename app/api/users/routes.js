const express = require('express')
const router = express.Router();
const controllers = require('./controllers')

router.post('/signup', controllers.signup);

router.post('/login', controllers.login);

router.get('/getMe', controllers.getMe);

module.exports = router;