require("dotenv").config();
const mongoose = require("mongoose");

const actorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    awards: Number,
});

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: [String],
    year: Number,
    duration: Number,
    actors: [actorSchema]
});

mongoose.model(process.env.DB_MOVIE_MODEL, movieSchema, process.env.DB_MOVIES_COLLECTION);
