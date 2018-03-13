'use strict'

const router = require('express').Router()

router.get('/', function(req, res, next) { 
    res.send('it works v1')
})


module.exports = router