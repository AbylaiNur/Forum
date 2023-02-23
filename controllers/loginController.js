const User = require('../models/user')

const login_index = (req, res) => {
    res.render('login', {user: req.session.user})
}

const login = async (req, res, next) => {
    const user = new User(req.body);
    console.log(user);
    console.log(req.session.user)
    user.time = new Date().getTime();
    const user2 = await User.findOne({'username': user.username});
    if (!user2) {
        res.redirect('/login');
    } else {
        const isMatch = user2.password === user.password;
        if (!isMatch) {
            res.redirect('/login');
        } else {
            console.log("here")
            req.session.user = user2;
            res.redirect('/');
        }
    }
}

module.exports = {
    login,
    login_index
}

