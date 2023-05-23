const express = require("express");
const router = express.Router();

const movieRoutes = require("../routes/movies.routes");
// const actorRoutes = require("../routes/actor.routes");
const userRoutes = require("../routes/user.routes");

// router.use("/movies", actorRoutes);
router.use("/movies", movieRoutes);
router.use("/users", userRoutes);

module.exports = router;