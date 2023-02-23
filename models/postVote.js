const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postVoteSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    post_id: Schema.Types.ObjectId,
    value: Number,
}, {timestamps : true});

const PostVote = mongoose.model('PostVote', postVoteSchema);

module.exports = PostVote;