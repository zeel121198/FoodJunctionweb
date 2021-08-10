
var mongoose  = require('mongoose');

// define the class using mongoose schema
var foodSchema = new mongoose.Schema({
  food: {
    type: String,
    required: 'its requried to fill'
  },
  servings: {
    type: String
  },
  cuisine: {
    type: String
  },
  
  userID: {
    type: String
  },
  addedDate: {
    type: Date
  },
 

});

// make the class definition public as "Food"
module.exports = mongoose.model('Food', foodSchema);
