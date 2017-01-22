var express = require('express');
var router = express.Router();
var passport = require('passport');
var User= require('../models/UserModel');
var Offre = require('../models/OffreModel');
var Achat = require('../models/AchatModel');
var Commande = require('../models/CommandeModel');
var Demande = require('../models/DemandeModel');
var Prestation = require('../models/PrestationModel');
var roleHandler  = require('../middleware/RoleMiddleware');
var modelHandler = require('../models/ModelHandler');
var formidable = require('formidable');

/****
 * gestion du login et des permissions
 */
router.get('/user',roleHandler.user, (req, res) => {
   let user =  req.user.getUser();
   console.log(user);
    res.json({ user :user, error : req.flash('error')});
});

router.post('/user/authenticate', (req, res, next) => {

    passport.authenticate('local')(req,res, () =>{
        console.log('erreur');
        req.session.save((err) => {
            if (err) {
                res.json({'err':err});
            }

            res.json({
                "status":true,
                "user": req.user.getUser()
            });
        });

    });
    // return next(err);
});

router.post('/users',(req, res) => {
    let user = new User(req.body);
        user.role.push('ADMIN');
    user.save(function(err,data){
        if(err){
            console.log(user);
            return res.json({status:false,error:err})
        }
        res.json(data);
    });
});
router.get('/users',roleHandler.admin,(req, res) => {
    User.find({},function (err,data) {
        if(err){
            res.json({"status":false});
        }
        res.json(data);
    });
});


router.get('/logout',roleHandler.user,(req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
    });
    res.json({
        status:true,
        message:"vous vous êtes bien déconnecté"
    })
});
/**
 *
 * gestion de la ressource offre
 */
router.get('/offres',roleHandler.user,(req, res) => {
        modelHandler.findAll(req,res,Offre);
});
router.get('/offres/:id',roleHandler.user,(req, res) => {
    modelHandler.getById(req,res,Offre);
});
router.post('/admin/offres',(req, res) => {
    modelHandler.save(req,res,Offre);
});
router.put('/admin/offres/:id',(req, res) => {
    modelHandler.update(req,res,Offre);
});
router.delete('/admin/offres/:id',(req, res) => {
    modelHandler.remove(req,res,Offre);
});
/***
 *
 * gestion des prestations
 */
router.get('/prestations',roleHandler.user,(req, res) => {
    modelHandler.findAll(req,res,Prestation);
});
router.get('/prestations/:id',roleHandler.user,(req, res) => {
    modelHandler.getById(req,res,Prestation);
});
router.post('/admin/prestations',(req, res) => {
    modelHandler.save(req,res,Prestation);
});
router.put('/admin/prestations/:id',(req, res) => {
    modelHandler.update(req,res,Prestation);
});
router.delete('/admin/prestations/:id',(req, res) => {
    modelHandler.remove(req,res,Prestation);
});

/***
 *
 * gestionnaire de route demandes
 */
router.get('/demandes',roleHandler.user,(req, res) => {
    modelHandler.findAll(req,res,Demande);
});
router.get('/demandes/:id',roleHandler.user,(req, res) => {
    modelHandler.getById(req,res,Demande);

});
router.post('/demandes',roleHandler.user,(req, res) => {
    modelHandler.save(req,res,Demande);

});
router.put('/demandes/:id',roleHandler.user,(req, res) => {
    modelHandler.update(req,res,Demande);
});
router.delete('/demandes/:id',roleHandler.user,(req, res) => {
    modelHandler.remove(req,res,Demande);
});

/***
 *
 * commandes
 */
router.get('/commande',roleHandler.user,(req, res) => {
    Commande.find({}).populate({
        path:'achats',
        populate:{path:'offre prestation'}
    }).exec((err,commande)=>{
        if(err) res.json({status:false,erreur:err});
        res.json(commande);
    } );
});
router.get('/commande/:id',roleHandler.user,(req, res) => {
    modelHandler.getById(req,res,Commande);

});
router.post('/commande',roleHandler.user,(req, res) => {
    let commande = new Commande({_auteur:req.user._id});
    commande.save((err) =>{
        if(err){
            res.json({status:false,erreur:err});
        }
        if(req.session.achats){
            let nbre = req.session.achats.length;
            console.log(nbre);
            for (var i = 0; i < req.session.achats.length; i++) {
                var obj = req.session.achats[i];
                obj._commande=commande._id;
                let achat =new Achat(obj);
                achat.save(function(err){
                    if(err){
                        res.json({status:false,erreur:err});
                    }
                });
            }
            commande.update(function(err){
                if(err) res.json({status:false,erreur:err});
            });
            res.json({status:true,data:commande});
        }else{
            res.json({status:false,message:"aucun achat a été fait"});
        }

    });

});


/**
 * achat session
 */
router.get('/achat',roleHandler.user,(req, res) => {
    Achat.find({}, function (err, data) {
        if (err) {
            res.json({status: false, error: err});
        }
        res.json({status: true, offre: data})
    }).populate('_prestation');
});
router.get('/achat/:id',roleHandler.user,(req, res) => {
    Achat.findOne({_id:req.body.id}, function (err, data) {
        if (err) {
            res.json({status: false, error: err});
        }
        res.json({status: true, offre: data})
    }).populate('_prestation');
});
router.post('/achat',roleHandler.user,(req, res) => {
        modelHandler.save(req,res,Achat)
});
router.put('/achat/:id',roleHandler.user,(req, res) => {
    modelHandler.update(req,res,Achat);
});
router.delete('/achat/:id',roleHandler.user,(req, res) => {
    modelHandler.remove(req,res,Achat);
});
router.post('/session/achat',roleHandler.user,(req, res) => {
    if(!req.session.achats){
        req.session.achats=[];
    }
    achat = new Achat(req.body);
    req.session.achats.push(achat);
    res.json({status:true,message:"add to session"});
});



var form = require('formidable');
/* GET home page. */


router.post('/upload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir="./uploads";

    form.parse(req,function(err,fiels,file){
        console.log(fiels,file);
    });
});

module.exports = router;