let mongoose = require('mongoose');
let  Schema = mongoose.Schema;

let User = require('./UserModel');
CommandeSchema = new Schema({
    achats:[require('./schema/AchatSchema')],
    auteur:[{type:Number,ref: 'User'}]
});

module.exports = mongoose.model('Commande',CommandeSchema);