const express = require('express');
const router = express.Router();
const titleController = require('../controllers/titleController')
const {isAuth} = require('../helpers/helper');

router.get('/:id', titleController.title_details);
router.get('/:id/addWatchLater', isAuth, titleController.title_add_watch_later);
router.get('/:id/addFavorite', isAuth, titleController.title_add_favorite);
router.get('/:id/addWatched', isAuth, titleController.title_add_watched);
router.post('/comment/:id',isAuth, titleController.title_add_comment);
router.post('/:id/reply/:id2',isAuth,titleController.title_reply_to_comment);

router.post('/comment/:id', (req, res) => res.redirect('/login'));
router.post('/:id/reply/:id2', (req, res) => res.redirect('/login'));

module.exports = router;