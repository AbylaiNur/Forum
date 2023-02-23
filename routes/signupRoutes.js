const express = require('express');
const router = express.Router();
const signupController = require("../controllers/signupController");
const {isAuth} = require("../helpers/helper");
const {signup_index} = require("../controllers/signupController");

router.get('/', isAuth, signup_index)

router.get('/', signupController.signup_index);

router.post('/', signupController.signup_create_user);

module.exports = router;