let mongoose = require('mongoose');
let  Schema = mongoose.Schema;
let User = require('./UserModel');

DemandeSchema = new Schema({
    type:String,
    grosseur:String,
    quantite:Number,
    auteur:[{type:Number,ref:'User'}]
});

module.exports = mongoose.model('Demande',DemandeSchema);