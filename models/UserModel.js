let mongoose = require('mongoose');
let Schema= mongoose.Schema;
let Account = require('./AccountModel');
let UserSchema= new Schema({
    'email':String,
    'username':String,
    'password':String,
    'nom':String,
    'prenom':String,
    'telephone':String,
    'adresse':{
        'ville':String,
        'quartier':String,
        'secteur':String,
    },
    'imageUrl':String,
    'role':String

});

module.exports= mongoose.model('User',UserSchema);