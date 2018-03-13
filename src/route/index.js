'use strict'

const router = require('express').Router()

router.use('/api', require('./api'))
router.use('/api/v1', require('./api/v1'))

module.exports = router
