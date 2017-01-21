let mongoose = require('mongoose');
let Schema= mongoose.Schema;
let Account = require('./AccountModel');
let UserSchema= new Schema({
    'nom':String,
    'prenom':String,
    'telephone':String,
    'adresse':{
        'ville':String,
        'quartier':String,
        'secteur':String,
    },
    'email':String,
    'account':[{type:Number,ref:'Account'}],
    'imageUrl':String,
    'role':String

});

module.exports= mongoose.model('User',UserSchema);