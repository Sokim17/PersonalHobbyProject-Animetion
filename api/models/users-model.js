const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Required"]
    },
    username: {
        type: String,
        required: [true, "Username Required"],
        unique : true
    },
    password: {
        type: String,
        required: [true, "Password Required"]
    }
});

mongoose.model(process.env.DB_USER_MODEL, userSchema, process.env.DB_USERS_COLLECTION);

