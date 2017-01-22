mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Prestation = require('./../PrestationModel');
let User = require('./../UserModel');
let Offre = require('./../OffreModel');
let Commande = require('./../CommandeModel');

AchatSchema = new Schema({
    offre:{type:Number, ref:'Offre'},
    quantie:Number,
    _prestation:{type:Number, ref:"Prestation"},
    cout:Number,
    date: Date,
    _commande:{type:Number, ref:'Commande'},
    _auteur:{type:Number,ref:'User'}
});
AchatSchema.methods.prix= function prix(){
    this.cout =this.offre.coutOffre()+this.prestation.coutPrestation();
    return this.cout;
};
module.exports= AchatSchema;