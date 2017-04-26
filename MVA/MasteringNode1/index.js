"use strict";

const http      = require("http");
const express   = require("express");
const fs        = require("fs");

//const configJson = fs.readFileSync("./config.json");

fs.readFile("./config.json", "utf8", (err, data) => {

    const config = JSON.parse(data);

    const app = express();

    app.use(express.static(config.webServer.folder));

    const httpServer = http.createServer(app);

    httpServer.listen(config.webServer.port, (err) => {
        if (err) {
            console.log(err.message);
            return;
        }

        console.log(`web server listening on port ${config.webServer.port}`);
    });

});

console.log("reading config file..");
