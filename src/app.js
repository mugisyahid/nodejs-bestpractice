"use strict"

const express = require('express')
const cors = require('cors')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.send('test')
})

// start server...
const server = app.listen( process.env.PORT || 3000, function(){
    console.log('Listening on port ' + server.address().port);
});