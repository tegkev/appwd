let mongoose = require('mongoose');
let  Schema = mongoose.Schema;
let User = require('./UserModel');
let PrestationSchema = new Schema({
   "nom":String,
    "cout":Number,
    "reduction":Number,
    "duree":Number,
    "auteur":[{type:Number,ref:'User'}]
});

module.exports  = mongoose.model('Prestation',PrestationSchema);