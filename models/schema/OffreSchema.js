mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User= require('./../UserModel');
OffreSchema = new Schema({
    "type":String,
    "slug":{
        type:String,
        index:true,
        unique:true
    },
    "grosser":String,
    "quandite":Number,
    "imageUrl":String,
    "prix":Number,
    "reduction":Number,
    "datePub":Date,
    "auteur":[{type:Number,ref:"User"}]
});
module.exports=OffreSchema;
