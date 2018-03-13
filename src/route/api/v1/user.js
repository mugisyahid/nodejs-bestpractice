'use strict'

const router = require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')


router.get('/', function(req, res, next) { 
    res.send('it works v1')
})


router.post('/register', function(req, res, next){
    let user = new User();
  
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);
  
    user.save().then(function(){
      return res.json({user: user.toJSON()});
    }).catch(next);
  });
  


module.exports = router