const express = require('express');
const router = express.Router();

const threadsController = require('../controllers/threadsController');

router.get('/', threadsController.index_threads)
router.get('/create', threadsController.index_create_thread)
router.post('/create', threadsController.create_thread)
router.post('/join/:threadId', threadsController.join_thread)
router.post('/leave/:threadId', threadsController.leave_thread)
router.get('/:threadId', threadsController.index_thread)


module.exports = router