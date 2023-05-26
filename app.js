require("./api/data/db");
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const routes = require('./api/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    res.header('Access-Control-Allow-Methods', "GET,DELETE,PATCH,POST,PUT");
    next();
});

app.use("/api", routes);

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

const server = app.listen(process.env.PORT, function () {
    console.log(process.env.SERVER_LISTENER, server.address().port);
});

app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));