
var express = require('express');
var router = express.Router();
var Food = require('../models/foods');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) 
  {
    next();
  }
  else 
  {
    res.redirect('/login');
  }
}
router.get('/', isLoggedIn, function(req, res, next) {
  Food.find(function(err, food) {
    if (err) 
    {
      console.log(err);
      res.render('error');
    }
    else {
      res.render('food', {
        title: 'Item list',
        food: food,
        user: req.user
      });  }  }); });

router.get('/add', isLoggedIn, function(req, res, next) {
  res.render('add-food', 
  {
    title: 'Add another item',
    user: req.user
  });
});


router.post('/add', isLoggedIn, function(req, res, next) {
  Food.create( 
    {
    food: req.body.food,
    cuisine: req.body.cuisine,
    servings: req.body.servings,
    userID: req.session.passport.user,
    addedDate: req.body.addedDate,  
  }, function(err, Food) {
    if(err) {
      console.log(err);
      res.render('error');
    }
    else {
      res.redirect('/food');
    } });});
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {

  var _id = req.params._id;
  Food.remove( { _id: _id }, function(err) {
    if (err) {
      console.log(err);
      res.render('error', {message: 'Delete Error'});
    }  res.redirect('/food');
  });
});
router.get('/edit/:_id', isLoggedIn, function(req, res, next) {
  var _id = req.params._id;

  Food.findById(_id, function(err, food) {
    if(err) {
      console.log(err);
      res.render('error', {message: 'Error while getting edit page'});
    }
    else {
      res.render('edit-food', {
          title: 'Edit item',
          food: food,
          user: req.user
      }); } }) });

router.post('/edit/:_id', isLoggedIn, function(req, res, next) {

  var _id = req.params._id;
  var food = new Food( {
    _id: _id,
    food: req.body.food,
    cuisine: req.body.cuisine,
    servings: req.body.servings,
    userID: req.session.passport.user,
    addedDate: req.body.addedDate,
   
  });
  Food.update( { _id: _id}, food, function(err) {
    if(err){
      console.log(err);
      res.render('error', {message: 'Error while updating food'});
    }
    else {
      res.redirect('/food');
    }
  });
});


module.exports = router;