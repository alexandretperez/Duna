const express = require("express");
const open = require("open");
const fs = require("fs");

var countriesDB = JSON.parse(fs.readFileSync("examples/db/countries.json", "utf-8"));
var usersDB = JSON.parse(fs.readFileSync("examples/db/users.json", "utf-8"));

const port = 3000;
const localhost = "http://localhost:" + port;

const server = express();
server.listen(port, () => {
    console.log("Listening " + localhost);
    open(localhost);
});

server
    // statics
    .use(express.static("dist"))
    .use(express.static("examples"))

    // routes
    .get("/", (req, res) => res.sendFile(`${__dirname}/dist/index.html`))
    .get("/data/:type/:query?", (req, res) => {
        const query = req.params.query;
        switch (req.params.type) {
            case "countries":
                sendCountries(query, res);
                break;
            case "users":
                sendUsers(query, res);
                break;
        }
    });

function sendCountries(query, res) {
    res.json(
        query ? countriesDB.filter(p => {
            return p.name.toLowerCase().indexOf(query) > -1 || p.alpha3Code.toLowerCase() === query;
        }) : countriesDB
    );
}

function sendUsers(query, res) {
    res.json(
        query ? usersDB.filter(p => {
            return p.name.toLowerCase().indexOf(query) > -1 || p.company.toLowerCase().indexOf(query) > -1;
        }) : usersDB
    );
}