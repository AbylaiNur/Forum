const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const { isAuth, isAdmin } = require("../helpers/helper");


router.get('/', isAuth, (req, res, next) => {
    res.redirect('profile')
});

router.get('/', loginController.login_index);

router.post('/', loginController.login);

module.exports = router;
