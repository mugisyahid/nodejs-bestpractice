"use strict"
const winston = require('winston')
const { combine, timestamp, label, printf } = winston.format;

const tsFormat = () => (new Date()).toLocaleTimeString();

const logFormat = printf(info => {
    return `[${info.timestamp}] ${info.level}: ${info.message}`;
});

const transports = {
    console: new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: tsFormat
    }),timestamp: tsFormat,
    file: new winston.transports.File({
        level: 'info',
        filename: './var/log/log.txt',
        handleExceptions: true,
        json: false,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false,
        timestamp: tsFormat
    })
}

const logger = new winston.createLogger({
    format: combine(
        label({ label: '' }),
        timestamp(),
        logFormat
    ),
    transports: [transports.console, transports.file],
    exitOnError: false
});

module.exports = logger;