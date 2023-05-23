const mongoose = require("mongoose");
require("dotenv").config();
require("../models/movies-model");
require("../models/users-model");

mongoose.connect(process.env.DB_URL,
    { useUnifiedTopology: true });

mongoose.connection.on(process.env.MONGOOSE_CONNECTED, function () {
    console.log(process.env.MONGOOSE_CONNECTED_MESSAGE, process.env.DB_Name);
});

mongoose.connection.on(process.env.ERROR, function (error) {
    console.log(process.env.ERROR_MESSAGE, error);
});

// process.on(process.env.SIGINT, function () {
//     mongoose.connection.close(function () {
//         console.log(process.env.SIGINT_MESSAGE);
//         process.exit(process.env.PROCESS_EXIT);
//     });
// });

// process.on(process.env.SIGTERM, function () {
//     mongoose.connection.close(function () {
//         console.log(process.env.SIGTERM_MESSAGE);
//         process.exit(process.env.PROCESS_EXIT);
//     });
// });

// process.on(process.env.SIGUSR2, function () {
//     mongoose.connection.on(function () {
//         console.log(process.env.SIGUSR2_MESSAGE);
//         process.kill(process.pid, process.env.SIGUSR2);
//     })
// });