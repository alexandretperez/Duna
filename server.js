const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

var countriesDataSource = JSON.parse(fs.readFileSync("examples/db/countries.json", "utf-8"));
var usersDataSource = JSON.parse(fs.readFileSync("examples/db/users.json", "utf-8"));

app.listen(port, () => {
    console.log("Listening localhost:" + port);
});

app.get("/", (req, res) => {
    res.sendFile(example("index.html"));
});

app.use(express.static("lib"));
app.use(express.static("examples"));
app.use(express.static("examples/assets"));
app.use("/assets/imgs", express.static("examples/assets/imgs"));
app.use("/assets/fonts", express.static("examples/assets/fonts"));


function example(fileName) {
    return __dirname + "/examples/" + fileName;
}

app.get("/data/:type/:query?", (req, res) => {
    console.log(req.params);
    var handler;
    var source;
    switch (req.params.type) {
        case "countries":
            handler = (q) => {
                if (q) {
                    source = countriesDataSource.filter(p => {
                        return p.name.toLowerCase().indexOf(q) > -1 || p.alpha3Code.toLowerCase() === q;
                    });
                }
                else
                    source = countriesDataSource;
            };
            break;

        case "users":
            handler = (q) => {
                if (q) {
                    source = usersDataSource.filter(p => {
                        return p.name.toLowerCase().indexOf(q) > -1 || p.company.toLowerCase().indexOf(q) > -1;
                    });
                } else
                    source = usersDataSource;
            };
    }

    var query = (req.params.query || '').toLowerCase();
    if (handler)
        handler(query);

    res.json(source);
});