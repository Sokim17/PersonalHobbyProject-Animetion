const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.route("/")
    .post(userController.register);

router.route("/login")
    .post(userController.login);

module.exports = router;
