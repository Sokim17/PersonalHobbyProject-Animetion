const mongoose = require("mongoose");
require("dotenv").config();
const User = mongoose.model(process.env.DB_USER_MODEL);
const bcrypt = require("bcrypt");

const response = {
    status: parseInt(process.env.HTTP_RESPONSE_OK),
    message: ""
};

const _sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}

const _setInternalErrorResponse = function (response, error) {
    response.status = parseInt(process.env.HTTP_RESPONSE_INTERNAL_SERVER_ERROR);
    response.message = error;
}

const _setHttpOkResponse = function (response, object) {
    response.status = parseInt(process.env.HTTP_RESPONSE_OK);
    response.message = object;
}

const _setNotFoundResponse = function (response) {
    response.status = parseInt(process.env.HTTP_RESPONSE_NOT_FOUND);
    response.message = process.env.NOT_FOUND_MESSAGE;
}

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
    response.status = 201;
    response.message = addNewUser;
};

const addOne = function (req, res) {
    if (req.body) {
        const saltRound = process.env.SALT_ROUND;
        bcrypt.genSalt(saltRound)
            .then((salt) => _generateHash(req.body.password, salt))
            .then((passwordHash) => _createUser(req, passwordHash))
            .then((addNewUser) => _setSuccessUser(response.status, addNewUser))
            .catch((error) => _setInternalErrorResponse(response, error))
            .finally(() => _sendResponse(res, response));
    }
}

const _checkUserExists = function (user) {
    return new Promise((resolve, reject) => {
        if (!user) {
            _setNotFoundResponse(user);
            reject(user);
        } else {
            resolve(user);
        }
    });
}
// const _createResponse = function (status = 201, message = "success") {
//     return status
// }
const _setSuccessLogin = function (response, message = "success") {
    response.status = 201;
    response.message = message;
}
const _checkPassword = function (password, encryptedPassword) {
    return bcrypt.compare(password, encryptedPassword);
}
const _checkPasswordMatch = function (isPasswordMatch) {
    return new Promise((resolve, reject) => {
        if (isPasswordMatch) {
            resolve("password correct");
        } else {
            reject("password incorrect");
        }
    });
}
const _response = {
    status: 201,
    message: "Found"
}
const _generateToken = function(){

}

const getOne = function (req, res) {
   console.log("username",req.body.username);
   console.log("password",req.body.password);
    // console.log("Login")
    if (req.body && req.body.username && req.body.password) {
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (err) {
                    _response.status = 500;
                    _response.message = "Internal Error";
                }
                else if (!user) {
                    _response.status = 404;
                    _response.message = "Username Not Found";
                    return;
                }
                bcrypt.compare(req.body.password, user.password)
                    .then((isPasswordMatch) => {
                        if (isPasswordMatch) {
                            _response.status = 200;
                            _response.message = "Password Match";
                        } else {
                            _response.status = 500;
                            _response.message = "Wrong Password";
                        }
                    })
                    .catch((error) => {
                        _response.status = 501;
                        _response.message = error;
                    })
            })
            .catch((error) => {
                _response.status = 501;
                _response.message = error;
            }).finally(() => {
                res.status(_response.status).json(_response.message);
            });


        // User.findOne({ username : req.body.username })
        //     .then((user) => _checkUserExists(user))
        //     .then((user) => _checkPassword(req.body.password, user.password))
        //     .then((isPasswordMatch) => _checkPasswordMatch(isPasswordMatch))
        //     .then(() => _setSuccessLogin(response, "success"))
        //     .catch((error) => _setInternalErrorResponse(response, error))
        //     .finally(() => _sendResponse(res, response));
    }
}

module.exports = {
    register: addOne,
    login: getOne
}