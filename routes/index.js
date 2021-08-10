
var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var passport = require('passport');
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'FOOD JUNCTION',
    user: req.user
  });
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register',
    user: req.user
  });
});

router.post('/register', function(req, res, next) {
  
  Account.register(new Account ({ username: req.body.username }),
    req.body.password, function(err, account) {
      if (err) {
        console.log(err);
        res.render('error');
      }
      else {
        res.redirect('/login');
      }
    });
});
router.get('/login', function(req, res, next) {
  var messages = req.session.messages || [];
  req.session.messages = null;
  res.render('login', {
    title: 'Login',
    messages: messages,
    user: req.user
  });
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/food', 
  failureRedirect: '/login',
  failureMessage: 'Invalid Login' 
}));
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
}); module.exports = router;