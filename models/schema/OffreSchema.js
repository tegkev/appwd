mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User= require('./../UserModel');

OffreSchema = new Schema({
    "type":String,
    "grosser":{
        type:String,
        require:[true,"veuillez entrer la grosseur"]
    },
    "quantite":{
        type:Number,
        required:[true, "veuillez entrer la quantite"]
    },
    "image":{
        path:String,
        name:String
    },
    "prix":Number,
    "reduction":Number,
    "datePub":{
        type:Date,
        default:Date.now()
    },
    "_auteur":[{type:String,ref:"User"}]
});
OffreSchema.methods.coutOffre=function coutOffre(){
    return this.prix(1-(this.reduction*this.cout/100));
};
module.exports=OffreSchema;
