const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");
const actorController = require("../controllers/actorControllers");
const authenticationController = require("../controllers/authenticationControllers");

router.route("/")
    .get(movieController.getAllMovies)
    .post(authenticationController.authentication, movieController.insertOneMovie);

router.route("/:movieId")
    .get(movieController.getOneMovieById)
    .delete(authenticationController.authentication, movieController.deleteMovieById)
    .put(authenticationController.authentication, movieController.fullUpdateMovie)
    .patch(authenticationController.authentication, movieController.updateMoviePartially);

router.route("/:movieId/actors")
    .get(actorController.getAllActors)
    .post(authenticationController.authentication, actorController.addActor);

router.route("/:movieId/actors/:actorId")
    .get(actorController.getOneActorById)
    .delete(authenticationController.authentication, actorController.deleteActorByMovieId)
    .put(authenticationController.authentication, actorController.fullUpdateActor)
    .patch(authenticationController.authentication, actorController.partialUpdateActor);
    
module.exports = router;