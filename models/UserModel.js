let mongoose = require('mongoose');
let passwordHash =require('password-hash');
let Schema= mongoose.Schema;

function hash(v){
    return passwordHash.generate(v);
}
let UserSchema;
UserSchema = new Schema({
    'email': {
        type: String,
        required: [true, "l'addresse email est obligatoire"],
        unique: [true, "Cette adresse mail est déjà pris"],
        validate: {
            validator: function (v) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(v);
            },
            message: "l'adresse mail saisie n'est pas valide"
        }
    },
    'password': {type: String, set: hash},
    'nom': {
        type: String,
        required: [true, 'veuillez saisir votre nom']
    },
    'prenom': String,
    'telephone': {
        type: String,
        validate: {
            validator: function (v) {
                return /\+?\d{9,12}/.test(v);
            },
            message:"Le numero saisie n'est pas valide"
        }
    },
    'adresse': {
        'ville': String,
        'quartier': String,
        'secteur': String,
    },
    'image': {
        path:String,
        name:String,
    },
    'role': {
        type:Array,
        default:['USER']
    },
    'dateCreat':{
        type:Date,
        default:Date.now()
    }


});
UserSchema.methods.validPassword=function validPassword(password){
    return passwordHash.verify(password,this.password);
};
UserSchema.methods.loginHas = function loginHas(role){
    return this.role.includes(role);
};
UserSchema.methods.getUser = function getUser(){
    return {
        _id:this._id,
        email:this.email,
        nom:this.nom,
        prenom:this.prenom,
        telephone:this.telephone,
        addresse:this.addresse,
        image:this.image,
        role:this.role,
        dateCreate:this.dateCreate
    }
};


module.exports= mongoose.model('User',UserSchema);