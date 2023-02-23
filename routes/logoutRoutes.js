const express = require('express');
const router = express.Router();

const logoutController = require('../controllers/logoutController');
const {isAuth} = require("../helpers/helper");

router.get('/', isAuth, logoutController.logout)

router.get('/', logoutController.logout_to_index);

module.exports = router;