mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = require('./../PrestationModel');
let Offre = require('./../OffreModel');


AchatSchema = new Schema({
    offre:{type:Number, ref:'Offre'},
    quantie:Number,
    prestation:{type:Number, ref:"User"},
    cout:Number,
    date: Date,
});

module.exports= AchatSchema;