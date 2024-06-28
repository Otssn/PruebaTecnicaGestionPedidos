const express = require('express');
const router =  express.Router();
const login_controller = require('../controller/login_controller');

router.post('/', login_controller.get_user);

module.exports = router;