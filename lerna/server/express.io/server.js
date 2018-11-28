// https://parceljs.org/api.html

// const Bundler = require('parcel-bundler');
const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const routes = require("./routes.js");
const sio = require("./sio.js");

const file = path.resolve(__dirname, '..', '..', 'dist', 'index.html');
const options = {
    detailedReport: false,
};

// const bundler = new Bundler(file, options);
var app = express();
const server = http.createServer(app);
const port = 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, '..', '..', 'dist')));

routes(app);
sio(server);
// app.use(bundler.middleware());

server.listen(port, () => console.log(`Listening on port ${port}`));
