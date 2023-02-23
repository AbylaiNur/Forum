const isAuth = (req, res, next) => {
    if (req.session.user) next();
    else next('route');
}

const isAdmin = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            next();
        } else {
            next('route');
        }
    }
    else next('route');
}



module.exports = {
    isAuth,
    isAdmin
}