const axios = require("axios");

const movies_page = async (req, res) => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=9db36715f42a504baccc657a0d88c924&language=en-US&page=1').then(resp => {
        const movies = resp.data.results;
        res.render('movies', {movies});
    })
    // res.render('movies', {movies});
}


module.exports = {
    movies_page
}
