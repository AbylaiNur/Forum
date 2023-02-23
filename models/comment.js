const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post_id: Schema.Types.ObjectId,
    level: Number,
    user_id: Schema.Types.ObjectId,
    body: String,
    replies: Array,
}, {timestamps : true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;