require("../models/movies-model");
require("dotenv").config();
const mongoose = require("mongoose");
const Movie = mongoose.model(process.env.DB_MOVIE_MODEL);

const _findById = function (id) {
    return Movie.findById(id);
}
const _findByIdAndDelete = function (id) {
    return Movie.findByIdAndDelete(id);
}
const _findMovies = function (offset, count) {
    return Movie.find().skip(offset).limit(count);
}

const response = {
    status: parseInt(process.env.HTTP_RESPONSE_OK),
    message: process.env.HTTP_RESPONSE_OK_MESSAGE
}
const _sendResponse = function (res, response) {
    res.status(parseInt(response.status)).json(response.message);
}
const _setInternalErrorResponse = function (response, error) {
    response.status = parseInt(process.env.HTTP_RESPONSE_INTERNAL_SERVER_ERROR);
    response.message = error;
}
const _setHttpOkResponse = function (response, object) {
    response.status = parseInt(process.env.HTTP_RESPONSE_OK);
    response.message = object;
}

const _setErrorResponse = function (err, response) {
    if (err.status) {
        response = err;
    } else {
        _setInternalErrorResponse(response, err);
    }
}

const _checkMovie = function (response, movie) {
    return new Promise((resolve, reject) => {
        if (!movie) {
            response.status = parseInt(process.env.HTTP_RESPONSE_NOT_FOUND);
            response.message = process.env.NOT_FOUND_MESSAGE;
            reject(response);
        } else {
            resolve(movie);
        }
    })
}

const _createNewMovie = function (req) {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        year: parseInt(req.body.year),
        duration: parseInt(req.body.duration),
        location: req.body.location,
        actors: req.body.actors
    };
    return Movie.create(newMovie);
}

const _checkPaginationParams = function (req, res) {
    return new Promise((resolve, reject) => {
        let offset = 0;
        let count = 5;

        if (!req.query) {
            reject();
        } else {
            if (req.query && req.query.offset) {
                offset = parseInt(req.query.offset, 10);
            }
            if (req.query && req.query.count) {
                count = parseInt(req.query.count, 10);
            }
            if (isNaN(offset)) {
                res.status(process.env.HTTP_RESPONSE_NO).json({ message: process.env.QUERY_STRING_OFFSET_MESSAGE });
                return;
            }
            if (isNaN(count)) {
                res.status(process.env.HTTP_RESPONSE_NO).json({ message: process.env.QUERY_STRING_COUNT_MESSAGE });
                return;
            }
            resolve({ offset, count });
        }
    })
}


const _movieFullUpdate = function (req, movie) {
    movie.title = req.body.title;
    movie.genre = req.body.genre;
    movie.year = parseInt(req.body.year);
    movie.location = req.body.location;
    movie.duration = parseInt(req.body.duration);

    const actors = req.body.actors;

    const actorList = [];
    for (a of actors) {
        actorList.push({ name: a.name ?? process.env.NO_NAME });
    }
    movie.actors = actorList;
    return movie.save()
}
const _moviePartialUpdate = function (req, movie) {
    if (req.body.title) {
        movie.title = req.body.title;
    }
    if (req.body.genre) {
        movie.genre = req.body.genre;
    }
    if (req.body.year) {
        movie.year = parseInt(req.body.year);
    }
    if (req.body.duration) {
        movie.duration = parseInt(req.body.duration);
    }
    if (req.body.location) {
        movie.location = req.body.location;
    }
    if (req.body.actor) {
        const actors = req.body.actors;
        const actorList = [];
        for (a of actors) {
            actorList.push({ name: a.name ?? process.env.NO_NAME });
        }
        movie.actors = actorList;
    }
    return movie.save()
}

const getAllMovies = function (req, res) {
    _checkPaginationParams(req, res)
        .then(({ offset, count }) => _findMovies(offset, count))
        .then(movie => _checkMovie(response, movie))
        .then(movie => _setHttpOkResponse(response, movie))
        .catch(error => _setErrorResponse(error, response))
        .finally(() => _sendResponse(res, response));
};

const getOneMovieById = function (req, res) {
    const movieId = req.params.movieId;
    _findById(movieId)
        .then(movie => _checkMovie(response, movie))
        .then(movie => _setHttpOkResponse(response, movie))
        .catch(error => _setErrorResponse(error, response))
        .finally(() => _sendResponse(res, response));
};

const deleteMovieById = function (req, res) {
    const movieId = req.params.movieId;
    _findByIdAndDelete(movieId)
        .then(movie => _checkMovie(response, movie))
        .then(movie => _setHttpOkResponse(response, movie))
        .catch(error => _setErrorResponse(error, response))
        .finally(() => _sendResponse(res, response));
}

const insertOneMovie = function (req, res) {
    if (req.body) {
        _createNewMovie(req)
            .then(movie => _setHttpOkResponse(response, movie))
            .catch(error => _setErrorResponse(error, response))
            .finally(() => _sendResponse(res, response));
    }
}

const fullUpdateMovie = function (req, res) {
    const movieId = req.params.movieId;
    Movie.findById(movieId)
        .then(movie => _checkMovie(response, movie))
        .then(movie => _movieFullUpdate(req, movie))
        .then(movie => _setHttpOkResponse(response, movie))
        .catch(error => _setErrorResponse(error, response))
        .finally(() => _sendResponse(res, response));
};

const updateMoviePartially = function (req, res) {
    const movieId = req.params.movieId;
    Movie.findById(movieId)
        .then(movie => _checkMovie(response, movie))
        .then(movie => _moviePartialUpdate(req, movie))
        .then(movie => _setHttpOkResponse(response, movie))
        .catch(error => _setErrorResponse(error, response))
        .finally(() => _sendResponse(res, response));
}

module.exports = {
    getAllMovies,
    getOneMovieById,
    insertOneMovie,
    deleteMovieById,
    fullUpdateMovie,
    updateMoviePartially
};