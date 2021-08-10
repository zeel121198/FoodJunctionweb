
var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');
var AccountSchema = new mongoose.Schema({
    //username: String
    oauthID: String,
    created: Date
});


AccountSchema.plugin(plm);
module.exports = mongoose.model('Account', AccountSchema);