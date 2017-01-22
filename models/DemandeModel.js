let mongoose = require('mongoose');
let  Schema = mongoose.Schema;
let User = require('./UserModel');

DemandeSchema = new Schema({
    type:String,
    grosseur:String,
    quantite:Number,
    _auteur:[{type:String,ref:'User'}]
});

module.exports = mongoose.model('Demande',DemandeSchema);