const express = require("express");
const router = express.Router();

const actorController = require("../controllers/actorControllers");

router.route("/:movieId/actors")
    .get(actorController.getAllActors)
    .post(actorController.addActor);

router.route("/:movieId/actors/:actorId")
    .get(actorController.getOneActorById)
    .delete(actorController.deleteActorByMovieId)
    .put(actorController.fullUpdateActor)
    .patch(actorController.partialUpdateActor);

module.exports = router;
