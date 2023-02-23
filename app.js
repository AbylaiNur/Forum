const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo');
require('dotenv').config()

const signupRouter = require('./routes/signupRoutes');
const profileRouter = require('./routes/profileRoutes');
const loginRouter = require('./routes/loginRoutes');
const logoutRouter = require('./routes/logoutRoutes');
const threadsRouter = require('./routes/threadsRouter')
const postRouter = require('./routes/postRoutes')

// model for User
const {maxAge} = require("express-session/session/cookie");


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded( { extended: true} ));


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err));

app.use(session({
    secret: 'my key',
    resave: 'false',
    saveUninitialized: 'false',
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL
    })
}));


app.get('/', async (req, res) => {
    res.redirect('/threads');
});


app.use('/threads', threadsRouter)
app.use('/post', postRouter)
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);


app.use((req, res) => {
    res.status(404).render('404', {user: req.session.user});
});

