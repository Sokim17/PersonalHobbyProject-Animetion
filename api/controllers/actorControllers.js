require("../models/movies-model");
const mongoose = require("mongoose");
require("dotenv").config();
const Movie = mongoose.model(process.env.DB_MOVIE_MODEL);

const response = {
    status: parseInt(process.env.HTTP_RESPONSE_OK),
    message: "201"
}
const _sendResponse = function (res, response) {
    res.status(parseInt(response.status)).json(response.message);
}
const _setInternalErrorResponse = function (response, error) {
    response.status = process.env.HTTP_RESPONSE_INTERNAL_SERVER_ERROR;
    response.message = error;
}
const _setHttpOkResponse = function (response, object) {
    response.status = parseInt(process.env.HTTP_RESPONSE_OK);
    response.message = object;
}
const _setNotFoundResponse = function (response, object) {
    if (!object) {
        response.status = parseInt(process.env.HTTP_RESPONSE_NOT_FOUND);
        response.message = process.env.NOT_FOUND_MESSAGE;
    }
}

const _findById = function (id) {
    return Movie.findById(id);
}
const _findOneByIdAndUpdate = function (id) {
    return Movie.findOneAndUpdate(id);
}
const _checkMovie = function (response, movie) {
    // console.log("check movie", movie);

    return new Promise((resolve, reject) => {
        if (!movie) {
            response.status = parseInt(process.env.HTTP_RESPONSE_NOT_FOUND);
            response.message = process.env.MOVIE_NOT_FOUND_MESSAGE;
            reject(response);
        } else {
            resolve(movie);
        }
    })
}

const _checkActor = function (response, movie, req) {
    const actorId = req.params.actorId;

    return new Promise((resolve, reject) => {
        if (!movie.actors.id(actorId)) {
            response.status = parseInt(process.env.HTTP_RESPONSE_NOT_FOUND);
            response.message = process.env.ACTOR_NOT_FOUND_MESSAGE;
            reject(response);
        } else {
            resolve(movie.actors.id(actorId));
        }
    })
}

const _removeSpecificActor = function (movie, req) {
    const actorId = req.params.actorId;
    // console.log("actor id",actorId);
    const actor = movie.actors.id(actorId);
    return actor.remove();
}

const _saveMovie = function (movie) {
    return movie.save();
}
const _setErrorResponse = function (err, response) {
    if (err.status) {
        response = err;
    } else {
        _setInternalErrorResponse(response, err);
    }
}

const getAllActors = function (req, res) {
    const movieId = req.params.movieId;
    _findById(movieId).select(process.env.DB_SUB_DOCUMENT_Actors)
        .then(movie => _checkMovie(response, movie))
        .then(movie => _setHttpOkResponse(response, movie.actors))
        .catch(error => _setErrorResponse(error, response))
        .finally(() => _sendResponse(res, response));
};

const getOneActorById = function (req, res) {
    const movieId = req.params.movieId;

    _findById(movieId).select(process.env.DB_SUB_DOCUMENT_Actors)
        .then(movie => _checkMovie(response, movie))
        .then(movie => _checkActor(response, movie, req))
        .then(actor => _setHttpOkResponse(response, actor))
        .catch(error => _setErrorResponse(error, response))
        .finally(() => _sendResponse(res, response));
};

const addActor = function (req, res) {
    const movieId = req.params.movieId;
    const newActor = {
        name: req.body.name,
        age: parseInt(req.body.age),
        awards: parseInt(req.body.awards),
        location: req.body.location
    };

    _findOneByIdAndUpdate(movieId, { $push: { actors: newActor } }, { new: true })
        .then(movie => _checkMovie(response, movie))
        .then(movie => _setHttpOkResponse(response, movie.actors))
        .catch(error => _setErrorResponse(error, response))
        .finally(() => _sendResponse(res, response));
};

//not yet
const deleteActorByMovieId = function (req, res) {
    const movieId = req.params.movieId;
    const actorId = req.params.actorId;
    // const actor = movie.actors.id(actorId);

    _findById(movieId)
        .then(movie => _checkMovie(response, movie))
        .then(movie => _checkActor(response, movie, req))
        .then(movie => _removeSpecificActor(movie, req))
        .then(movie => _saveMovie(movie))
        .then(movie => _setHttpOkResponse(response, movie.actors))
        .catch(error => _setErrorResponse(error, response))
        .finally(() => _sendResponse(res, response));

    // .then(movie => {
    //     if (!movie) {
    //         res.status(process.env.HTTP_RESPONSE_NOT_FOUND).json({ message: process.env.process.env.MOVIE_NOT_FOUND_MESSAGE });
    //         return;
    //     }
    // if (!actor) {
    //     res.status(process.env.HTTP_RESPONSE_NOT_FOUND).json({ message: process.env.ACTOR_NOT_FOUND_MESSAGE});
    // }

    // actor.remove();

    // movie.save()
    // .then(updatedMovie => {
    //     res.status(process.env.HTTP_RESPONSE_OK).json(updatedMovie);
    // }).catch(err => {
    //     res.status(process.env.HTTP_RESPONSE_INTERNAL_SERVER_ERROR).json(err);
    // });
    // });
}

const _updateOne = function (req, res, updateActorCallBack) {

    const movieId = req.params.movieId;
    const actorId = req.params.actorId;

    _findById(movieId).then(movie => {
        if (!movie) {
            res.status(process.env.HTTP_RESPONSE_NOT_FOUND).json({ message: "Movie Not Found!" });
            return;
        }
        const actor = movie.actors.id(actorId);

        if (!actor) {
            res.status(process.env.HTTP_RESPONSE_NOT_FOUND).json({ message: "Actor Not Found!" });
        } else {
            updateActorCallBack(req, res, movie);
        }
    });
}

const _actorFullUpdate = function (req, movie) { //req, res, movie) 
    const actorId = req.params.actorId;
    const actor = movie.actors.id(actorId);

    actor.name = req.body.name;
    actor.age = parseInt(req.body.age);
    actor.location = req.body.location;
    actor.awards = parseInt(req.body.awards);
    movie.actors.id(actorId).set(actor);

    return movie.save()
    // .then(updatedMovie => {
    //     res.status(process.env.HTTP_RESPONSE_OK).json(updatedMovie);
    // }).catch(err => {
    //     res.status(process.env.HTTP_RESPONSE_INTERNAL_SERVER_ERROR).json(err);
    // });
}

const fullUpdateActor = function (req, res) {
    const movieId = req.params.movieId;
    const actorId = req.params.actorId;

    _findById(movieId)
        .then(movie => _checkMovie(response, movie))
        // .then(movie => _checkActor(response, movie, actorId))
        .then(movie => {
            if (!movie) {
                res.status(process.env.HTTP_RESPONSE_NOT_FOUND).json({ message: "Movie Not Found!" });
                return;
            }
            const actor = movie.actors.id(actorId);

            if (!actor) {
                res.status(process.env.HTTP_RESPONSE_NOT_FOUND).json({ message: "Actor Not Found!" });
            } else {
                updateActorCallBack(req, res, movie);
            }
        });
    // _updateOne(req, res, _actorFullUpdate);
}

const _actorPartialUpdate = function (req, res, movie) {
    const actorId = req.params.actorId;
    const actor = movie.actors.id(actorId);

    if (req.body.name) { actor.name = req.body.name };
    if (req.body.age) { actor.age = parseInt(req.body.age) };
    if (req.body.awards) { actor.awards = parseInt(req.body.awards) };
    if (req.body.location) { actor.location = req.body.location };

    movie.actors.id(actorId).set(actor);

    movie.save().then(updatedMovie => {
        res.status(process.env.HTTP_RESPONSE_OK).json(updatedMovie);
    }).catch(err => {
        res.status(process.env.HTTP_RESPONSE_INTERNAL_SERVER_ERROR).json(err);
    });
}

const partialUpdateActor = function (req, res) {
    _updateOne(req, res, _actorPartialUpdate);
}

module.exports = {
    getAllActors,
    getOneActorById,
    addActor,
    deleteActorByMovieId,
    fullUpdateActor,
    partialUpdateActor
}


