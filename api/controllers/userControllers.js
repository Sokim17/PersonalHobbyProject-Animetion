require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const utils = require("util");
const jwt = require("jsonwebtoken");
const User = mongoose.model(process.env.DB_USER_MODEL);

const response = {
    status: parseInt(process.env.HTTP_RESPONSE_OK),
    message: process.env.HTTP_RESPONSE_OK_MESSAGE
};

const _sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}

const _setInternalErrorResponse = function (response, error) {
    response.status = parseInt(process.env.HTTP_RESPONSE_INTERNAL_SERVER_ERROR);
    response.message = error;
}

const _setNotFoundResponse = function (response) {
    response.status = parseInt(process.env.HTTP_RESPONSE_NOT_FOUND);
    response.message = process.env.NOT_FOUND_MESSAGE;
}
//Add One
const _generateHash = function (password, salt) {
    return bcrypt.hash(password, salt);
}

const _createUser = function (req, passwordHash) {
    const newUser = {
        name: req.body.name,
        username: req.body.username,
        password: passwordHash
    }
    return User.create(newUser);
}

const _setSuccessUser = function (response, addNewUser) {
    response.status = parseInt(process.env.HTTP_RESPONSE_OK);
    response.message = addNewUser;
};


const addOne = function (req, res) {
    if (req.body) {
        console.log(req.body);
        const saltRound = parseInt(process.env.SALT_ROUND);
        bcrypt.genSalt(saltRound)
            .then((salt) => _generateHash(req.body.password, salt))
            .then((passwordHash) => _createUser(req, passwordHash))
            .then((addNewUser) => _setSuccessUser(response.status, addNewUser))
            .catch((error) => _setInternalErrorResponse(response, error))
            .finally(() => _sendResponse(res, response));
    }
}

//Get One
const _checkUserExists = function (response, user) {
    return new Promise((resolve, reject) => {
        if (!user) {
            _setNotFoundResponse(user);
            reject();
        } else {
            response.user = user;
            resolve(user);
        }
    });
}

const _checkPassword = function (password, user) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password)
        .then((isMatch)=> resolve({isMatch, user}))
        .catch((error) => reject(error));
    })
}

const _checkPasswordMatch = function (isPasswordMatch, user) {
    return new Promise((resolve, reject) => {
        if (isPasswordMatch) {
            resolve(user);
        } else {
            reject(process.env.REJECT_PASSWORD_INCORRECT);
        }
    });
}

const _generateToken = function (user) {
    const signature = utils.promisify(jwt.sign);
    return signature({ name: user.name }, process.env.SECRET_KEY, { expiresIn: 3600 });
}

const _setTokenInResponse = function (token, response) {
    response.status = parseInt(process.env.HTTP_RESPONSE_OK);
    response.message = { "token" : token };
}

const getOne = function (req, res) {
    if (req.body && req.body.username && req.body.password) {
        User.findOne({ username: req.body.username })
            .then((user) => _checkUserExists(response, user))
            .then((user) => _checkPassword(req.body.password, user))
            .then(({ isMatch, user }) => _checkPasswordMatch(isMatch, user))
            .then((user) => _generateToken(user))
            .then((token) => _setTokenInResponse(token, response))
            .catch((error) => _setInternalErrorResponse(response, error))
            .finally(() => _sendResponse(res, response));
    }
}

module.exports = {
    register: addOne,
    login: getOne
}