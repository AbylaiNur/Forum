const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentVoteSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    comment_id: Schema.Types.ObjectId,
    value: Number,
}, {timestamps : true});

const CommentVote = mongoose.model('CommentVote', commentVoteSchema);

module.exports = CommentVote;