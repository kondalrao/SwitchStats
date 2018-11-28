
const path = require('path');
const config = require('config');
const debug = require('debug')('@switch-stats/feathers');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const monitorio = require('monitor.io');
const services = require('./services');

const app = express(feathers());
const file = path.resolve(__dirname, '..', '..', 'dist', 'index.html');
const root = path.join(__dirname, '..', '..', 'dist');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(root));

app.configure(express.rest());
app.configure(socketio(config.get('server.socketio-port')));
app.configure(services);

app.use(monitorio({ port: config.get('server.monitor-port') })); 
app.use(express.errorHandler());

app.listen(config.get('server.port')).on('listening', () => {
    debug('Feathers server listening on localhost:'+config.get('server.port'));
    debug('Feathers socketio listening on localhost:'+config.get('server.socketio-port'));
    debug('Feathers monitor listening on localhost:'+config.get('server.monitor-port'));
  }
);
