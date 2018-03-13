"use strict"
const winston = require('../../node_modules/winston')

const transports = {
    console: new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }),
    file: new winston.transports.File({
        level: 'info',
        filename: '../../var/log/log.txt',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
    })
}

const logger = new winston.createLogger({
    transports: [transports.console, transports.file],
    exitOnError: false
});

module.exports = logger;