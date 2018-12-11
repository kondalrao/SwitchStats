const path = require('path');
const config = require('config');
const debug = require('debug');
const Bundler = require('parcel-bundler');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const monitorio = require('monitor.io');
const services = require('./services');

const error = debug('@switch-stats:error');
const log = debug('@switch-stats:log');

log.log = console.log.bind(console);
error.log = console.error.bind(console);

const options = {
  detailedReport: false,
};

const app = express(feathers());
const file = path.resolve(__dirname, '..', 'src', 'index.html');
const root = path.join(__dirname, '..', 'dist');

const bundler = new Bundler(file, options);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(root));

app.configure(express.rest());
app.configure(socketio(config.get('server.socketio-port')));
app.configure(services);

app.use(monitorio({ port: config.get('server.monitor-port') }));
app.use(express.errorHandler());
app.use(bundler.middleware()); // Should always be last app.use

app.listen(config.get('server.port')).on('listening', () => {
  console.log('Feathers server listening on localhost:' + config.get('server.port'));
  console.log('Feathers socketio listening on localhost:' + config.get('server.socketio-port'));
  console.log('Feathers monitor listening on localhost:' + config.get('server.monitor-port'));
});
