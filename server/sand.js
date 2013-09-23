'use strict';

// Dependancies
var nconf = require('nconf');
var restify = require('restify');

// Persistence
var dbTier = require('./persistence/mongoDBTier');

// Services
var logger = require('./services/logging').forFile(__filename);

// Routes
var router = require('./router');

nconf.use('file', { file: './config.json' });
nconf.load();

var server = restify.createServer({
	name: nconf.get('base:name'),
	version: nconf.get('base:version')
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Client Requests
server.get(/\/resources|views|modules\/?.*/, restify.serveStatic({
	directory: '../client'
}));

// Serve Home Page
server.get('/', restify.serveStatic({
	directory: '../client',
	default: 'index.html'
}));

server.listen(4000, function () {
	logger.info('%s listening at %s', server.name, server.url);
});