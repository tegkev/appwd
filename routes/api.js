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
        req.session.save((err) => {
            if (err) {
               // return next(err);
                console.log('erreur');
                res.json({'err':err});
            }

            res.json({
                "status":true,
                "user": req.user.getUser()
            });
        });

    });
});

router.post('/users',(req, res) => {
    let user = new User(req.body);
        user.role.push('ADMIN');
    user.save(function(err,data){
        if(err){
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
        modelHandler.findAll(Offre);
});
router.get('/offres/:id',roleHandler.user,(req, res) => {
    modelHandler.getById(Offre);
});
router.post('admin/offres',(req, res) => {
    modelHandler.save(Offre);
});
router.put('admin/offres/:id',(req, res) => {
    modelHandler.update(Offre);
});
router.delete('admin/offres/:id',(req, res) => {
    modelHandler.remove(Offre);
});
/***
 *
 * gestion des prestations
 */
router.get('/prestations',roleHandler.user,(req, res) => {
    modelHandler.findAll(Prestation);
});
router.get('/prestations/:id',roleHandler.user,(req, res) => {
    modelHandler.getById(Prestation);
});
router.post('admin/prestations',(req, res) => {
    modelHandler.save(Prestation);
});
router.put('admin/prestations/:id',(req, res) => {
    modelHandler.update(Prestation);
});
router.delete('admin/prestations/:id',(req, res) => {
    modelHandler.remove(Prestation);
});

/***
 *
 * gestionnaire de route demandes
 */
router.get('/demandes',roleHandler.user,(req, res) => {
    modelHandler.findAll(Demande);
});
router.get('/demandes/:id',roleHandler.user,(req, res) => {
    modelHandler.getById(Demande);

});
router.post('/demandes',roleHandler.user,(req, res) => {
    modelHandler.save(Demande);

});
router.put('/demandes/:id',roleHandler.user,(req, res) => {
    modelHandler.update(Demande);
});
router.delete('/demandes/:id',roleHandler.user,(req, res) => {
    modelHandler.remove(Demande);
});

/***
 *
 * commandes
 */
router.get('/commande',roleHandler.user,(req, res) => {
    modelHandler.findAll(Commande);
});
router.get('/commande/:id',roleHandler.user,(req, res) => {
    modelHandler.getById(Commande);

});
router.post('/commande',roleHandler.user,(req, res) => {
    let commande = new Commande({_auteur:req.user._id});
    commande.save((err) =>{
        if(err){
            res.json({status:false,erreur:err});
        }
        if(req.session.hasOwnProperty('achats')){
            for (var i = 0; i < req.session.achats.length; i++) {
                var obj = req.session.achats[i];
                obj._commande=commande._id;
                odj.save(function(err){
                    if(err){
                        res.json({status:false,erreur:err});
                    }
                })
            }
        }
        res.json({status:true});
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
        modelHandler.save(Achat)
});
router.put('/achat/:id',roleHandler.user,(req, res) => {
    modelHandler.update(Achat);
});
router.delete('/achat/:id',roleHandler.user,(req, res) => {
    modelHandler.remove(Achat);
});
router.post('/session/achat',(req, res) => {
    achat = new Achat(req.body);
    req.session.achats.push(achat);
});

module.exports = router;