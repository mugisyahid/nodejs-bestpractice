'use strict'

const router = require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')

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
    }).catch(next)
  })
  

  router.post('/login', function(req, res, next){
    if(!req.body.user.email){
      return res.status(422).json({errors: {email: "can't be blank"}});
    }
  
    if(!req.body.user.password){
      return res.status(422).json({errors: {password: "can't be blank"}});
    }
  
    passport.authenticate('local', {session: false}, function(err, user, info){
      if(err){ return next(err); }
  
      if(user){
        user.token = user.generateJWT();
        return res.json({user: user.toAuthJSON()});
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next)
  })
  


module.exports = router