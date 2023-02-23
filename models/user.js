const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true},
    email: String,
    password: String,
    isAdmin: Boolean
}, {timestamps : true});

const User = mongoose.model('User', userSchema);

module.exports = User;