const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const joinSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    thread_id: Schema.Types.ObjectId,
}, {timestamps : true});

const Join = mongoose.model('Join', joinSchema);

module.exports = Join;