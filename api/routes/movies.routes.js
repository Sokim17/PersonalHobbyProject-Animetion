const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");
const actorController = require("../controllers/actorControllers");

router.route("/")
    .get(movieController.getAllMovies)
    .post(movieController.insertOneMovie);

router.route("/:movieId")
    .get(movieController.getOneMovieById)
    .delete(movieController.deleteMovieById)
    .put(movieController.fullUpdateMovie)
    .patch(movieController.updateMoviePartially);

router.route("/:movieId/actors")
    .get(actorController.getAllActors)
    .post(actorController.addActor);

router.route("/:movieId/actors/:actorId")
    .get(actorController.getOneActorById)
    .delete(actorController.deleteActorByMovieId)
    .put(actorController.fullUpdateActor)
    .patch(actorController.partialUpdateActor);
module.exports = router;