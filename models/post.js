const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    thread_id: Schema.Types.ObjectId,
    header: String,
    tag: String,
    text: String,
}, {timestamps : true});

const Thread = mongoose.model('Post', postSchema);

module.exports = Thread;