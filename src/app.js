"use strict"

const express = require('express')
const cors = require('cors')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const yaml = require('js-yaml')
const fs = require('fs')

// custom service
const logger = require('./service/logger')

const app = express()

app.use(cors());
app.use(require('morgan')('combined', { stream: { write: message => logger.info(message) }}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// config
let config = {
    appName: "nodeJS is awesome",
    port: 3000,
    isProduction: false
}

try {
    config = yaml.safeLoad(fs.readFileSync('./var/config.yml', 'utf8'));
} catch (e) {
    logger.error(e)
    logger.info('use default config')
}
logger.info(JSON.stringify(config))

app.use(require('./route'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!config.isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// start server...
const server = app.listen(config.port, function() {
    logger.info('[starting] ' + config.appName + ' : ' + server.address().port)
});