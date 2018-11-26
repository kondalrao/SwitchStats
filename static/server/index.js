// https://parceljs.org/api.html

const path = require('path');
const Bundler = require('parcel-bundler');
const express = require('express');
var debug = require('express-debug')
const http = require('http');
const bodyParser = require('body-parser');
const routes = require("./routes.js");
const sio = require("./sio.js");

const file = path.resolve(__dirname, '..', 'src', 'index.html');
const options = {
    detailedReport: false,
};

const bundler = new Bundler(file, options);
var app = express();
const server = http.createServer(app);
const port = 4001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/static", express.static(path.join(__dirname, 'dist')));

routes(app);
sio(server);
app.use(bundler.middleware());

// debug(app, {});

// console.log(app._router.stack);

// app._router.stack.forEach(function(r){
//     if (r.route && r.route.path){
//       console.log(r.route.path)
//     }
// });

server.listen(port, () => console.log(`Listening on port ${port}`));