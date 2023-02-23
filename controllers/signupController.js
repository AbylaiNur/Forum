const User = require('../models/user');
// signup_create_user

const signup_index = (req, res) => {
    const user = req.session.user
    if (req.session.user) {
        res.redirect('/profile');
    }
    res.render('signup', {user: user});
}

const signup_create_user = async (req, res) => {
    const user = new User(req.body);
    user.time = new Date().getTime();
    user.watchLater = [];
    user.favorite = [];
    user.watched = [];
    user.role = 'user';

    let user2 = await User.findOne({'username': user.username});
    if (user2) {
        return res.redirect('/');
    }
    await user.save();
    res.redirect('/login');
}

module.exports = {
    signup_create_user,
    signup_index
}