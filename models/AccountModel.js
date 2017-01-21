let mongoose = require('mongoose');
let Schema= mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
let AccountSchema= new Schema({
    'username':String,
    'password':String,
    'email':String,

});

AccountSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model('Account',AccountSchema);