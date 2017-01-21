var express = require('express');
var router = express.Router();
var Account= require('../models/AccountModel');
var passport = require('passport');
var User= require('../models/UserModel');

router.get('/login', (req, res) => {
    res.json({ user : req.user, error : req.flash('error')});
});

router.get('/session',(req,res)=>{
    res.json(req.session);
});
router.post('/session',(req,res)=>{
    req.session.test = req.body;
    res.json(req.session);
});
router.get('/session/user',(req,res)=>{

    res.json(req.user);
});
router.post('/login', (req, res, next) => {

    passport.authenticate('local')(req,res, () =>{
        req.session.save((err) => {
            if (err) {
               // return next(err);
                res.json({'err':err});
            }
            console.log(req.user);
            res.json({
                "status":true,
                "user": req.user
            });
        });

    });
});

router.post('/users',function(req,res){
     new User(req.body).save(function(err,data){
        if(err){
            return res.json({status:false,error:err.message})
        }
        res.json(data);
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
    });
});

router.get('/users',function(req,res,next){
    User.find({},function (err,data) {
        if(err){
            res.json({"status":false});
        }
        res.json(data);
    });
});


module.exports = router;