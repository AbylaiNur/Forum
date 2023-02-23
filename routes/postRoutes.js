const express = require('express');
const router = express.Router();

const { isAuth } = require('../helpers/helper')

const postController = require('../controllers/postController');

router.get('/create', postController.index_create_post)
router.post('/create', postController.create_post)
router.post('/upvote/:postId', postController.create_post_upvote)
router.post('/downvote/:postId', postController.create_post_downvote)
router.post('/remove/upvote/:postId', postController.remove_post_upvote)
router.post('/remove/downvote/:postId', postController.remove_post_downvote)
router.get('/:postId', postController.index_post)

router.post('/comment/:postId',isAuth, postController.create_comment);
router.post('/:postId/reply/:commentId', isAuth, postController.create_reply_comment);

router.post('/comment/:postId', (req, res) => res.redirect('/login'));
router.post('/:postId/reply/:commentId', (req, res) => res.redirect('/login'));


module.exports = router