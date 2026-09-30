require("../models/movies-model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const util = require("util");

const authentication = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(parseInt(process.env.HTTP_RESPONSE_UNAUTHORIZE)).json({
            message: process.env.HTTP_RESPONSE_UNAUTHORIZE_MESSAGE || "Unauthorized"
        });
    }

    const token = authHeader.split(" ")[1];
    const jwtVerify = util.promisify(jwt.verify);

    jwtVerify(token, process.env.SECRET_KEY)
        .then(() => next())
        .catch(() => {
            res.status(parseInt(process.env.HTTP_RESPONSE_UNAUTHORIZE)).json({
                message: process.env.HTTP_RESPONSE_UNAUTHORIZE_MESSAGE || "Unauthorized"
            });
        });
};

module.exports = {
    authentication
};