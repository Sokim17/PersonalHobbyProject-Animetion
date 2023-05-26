require("../models/movies-model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const utils = require("util");

const response = {
    status: parseInt(process.env.HTTP_RESPONSE_OK),
    message: process.env.HTTP_RESPONSE_OK_MESSAGE
}

const authentication = function (req, res, next) {
    const headerExists = req.headers.authorization;
    if (headerExists) {
        const token = req.headers.authorization.split(' ')[1];
        const jwtVerifyPromise = utils.promisify(jwt.verify, { context: jwt });
        jwtVerifyPromise(token, process.env.SECRET_KEY)
            .then(() => next())
            .catch((error) => {
                response.status = parseInt(process.env.HTTP_RESPONSE_UNAUTHORIZE);
                response.message = process.env.HTTP_RESPONSE_UNAUTHORIZE_MESSAGE;
            })
    } else {
        res.status(response.status).json(response.message);
    }
}

module.exports = {
    authentication
}