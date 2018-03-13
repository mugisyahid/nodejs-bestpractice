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
    port: 3000
}

try {
    config = yaml.safeLoad(fs.readFileSync('./var/config.yml', 'utf8'));
} catch (e) {
    logger.error(e)
    logger.info('use default config')
}
logger.info(config)



app.get('/', function(req, res) {
    res.send('test')
})

// start server...
const server = app.listen(config.port, function() {
    logger.info('[starting] ' + config.appName + ' : ' + server.address().port)
});