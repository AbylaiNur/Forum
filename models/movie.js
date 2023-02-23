const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({

    adult: Boolean,
    backdrop_path: String,
    budget: Number,
    genres: Array,
    id: Number,
    original_language: String,
    overview: String,
    poster_path: String,
    production_companies: Array,
    production_countries: Array,
    release_date: String,
    revenue: Number,
    runtime: Number,
    spoken_languages: Array,
    status: String,
    tagline: String,
    title: String,
    vote: Number,
    vote_count: Number
})


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;