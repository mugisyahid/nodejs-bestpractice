'use strict'

const express = require('express')
const cors = require('cors')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const errorhandler = require('errorhandler')
const passport = require('passport')


// custom import
const config = require('./config')
const logger = require('./service/logger')

const app = express()

app.use(cors());
app.use(require('morgan')('combined', { stream: { write: message => logger.info(message) }}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

logger.info('[config] ' + JSON.stringify(config))

// session
app.use(session({ secret: config.secret, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!config.isProduction) {
  app.use(errorhandler());
}

// mongoose
const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}
mongoose.Promise = global.Promise
mongoose.set('debug', config.isProduction)
mongoose.connect(`${config.mongo.url}/${config.mongo.db}`, options)
.then(
  () => {
    logger.info('[mongodb] connected to ' + `${config.mongo.url}/${config.mongo.db}`)    
  },
  (err) => {
    logger.error('check your mongodb setting/connection')
    process.exit(1)
  }
)

// model before route
require('./model/User');

// passport
require('./config/passport')

// routes
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