const axios = require("axios");


const posters_index = (req, res) => {
    const popularMovie = 'https://api.themoviedb.org/3/movie/popular?api_key=9db36715f42a504baccc657a0d88c924&language=en-US&page=1';
    axios.get(popularMovie)
        .then((response) => res.render('posters', { movies : response.data.results, user : req.session.user }))
        .catch(err => console.log(err));
}

module.exports = {
    posters_index
}