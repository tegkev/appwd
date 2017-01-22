mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Prestation = require('./../PrestationModel');
let User = require('./../UserModel');
let Offre = require('./../OffreModel');
let Commande = require('./../CommandeModel');

AchatSchema = new Schema({
    offre:{type:String, ref:'Offre'},
    quantite:Number,
    _prestation:{type:String, ref:"Prestation"},
    cout:Number,
    date: Date,
    _commande:{type:String, ref:'Commande'},
    _auteur:{type:String,ref:'User'}
});
AchatSchema.methods.prix= function prix(){
    this.cout =this.offre.coutOffre()+this.prestation.coutPrestation();
    return this.cout;
};
module.exports= AchatSchema;