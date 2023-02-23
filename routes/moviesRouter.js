const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
router.get('/', moviesController.movies_page);

module.exports = router;