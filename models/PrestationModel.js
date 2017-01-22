let mongoose = require('mongoose');
let  Schema = mongoose.Schema;
let User = require('./UserModel');
let PrestationSchema = new Schema({
   "nom":{
       type:String,
       require:[true,"veuillez saisir un nom"]
   },
    "cout":{
       type:Number,
        validate:{
           validator:function(v){
               return /\d/.test(v);
           },
            message:"veuillez fournir un nombre"
        },
        required:[true, "veuillez renseigner le prix"]
    },
    "reduction":{
       type:Number,
        default:0
    },
    "duree":{
       type:Number,
        required:[true,"veuillez renseigner la duree"]
    },
    "auteur":[{type:Number,ref:'User'}]
});
PrestationSchema.methods.coutPrestation=function coutPrestation(){
    return this.cout(1-(this.reduction*this.cout/100));
};
module.exports  = mongoose.model('Prestation',PrestationSchema);