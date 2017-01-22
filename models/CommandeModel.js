let mongoose = require('mongoose');
let  Schema = mongoose.Schema;

let User = require('./UserModel');
let Achat =require('./schema/AchatSchema');
CommandeSchema = new Schema({
    achats:[{
        type:Schema.Types.ObjectId,
        ref:'Achat'
    }],
    _auteur:[{type:String,ref: 'User'}]
});
CommandeSchema.methods.prixTotal= function prixTotal(){
    let prix;
    for (var i = 0; i < this.achats.length; i++) {
        prix += this.achats.prix();
    }
    return prix;
};
module.exports = mongoose.model('Commande',CommandeSchema);