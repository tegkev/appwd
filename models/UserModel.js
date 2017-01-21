let mongoose = require('mongoose');
let passwordHash =require('password-hash');
let Schema= mongoose.Schema;

function hash(v){
    return passwordHash.generate(v);
}
let UserSchema= new Schema({
    'email':String,
    'username':String,
    'password':{type:String,set:hash},
    'nom':String,
    'prenom':String,
    'telephone':String,
    'adresse':{
        'ville':String,
        'quartier':String,
        'secteur':String,
    },
    'imageUrl':String,
    'role':Array,


});
UserSchema.methods.validPassword=function validPassword(password){
    console.log('ça marche');
    return passwordHash.verify(password,this.password);
};
UserSchema.methods.hasAdmin = function loginHas(role){
    return this.role.includes(role);
}

module.exports= mongoose.model('User',UserSchema);