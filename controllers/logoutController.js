

const logout = (req, res) => {
    req.session.user = null;
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect('/');
    })
}

const logout_to_index = (req, res) => {
    res.redirect('/');
}

module.exports = {
    logout,
    logout_to_index
}