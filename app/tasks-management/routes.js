const express = require('express');
const router = express.Router();
const controllers = require('./controllers');
const authController = require('../users/controllers')

router.use(authController.isLoggedIn);

router.post('/create', controllers.createTask);

router.get('/', controllers.fetchTasks);

router.put('/:id', controllers.updateTask);

router.delete('/:id', controllers.deleteTask);

module.exports = router;