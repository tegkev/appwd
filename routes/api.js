var express = require('express');
var router = express.Router();
var Account= require('../models/AccountModel');
var passport = require('passport');
var User= require('../models/UserModel');
hasAuth = require('connect-ensure-login').ensureLoggedIn();



router.get('/login', (req, res) => {
    res.json({ user : req.user, error : req.flash('error')});
});


router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
    });
});

router.register('/')

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
    });
});

router.get('/users',function(req,res,next) {
    console.log(req.session);
    next()
},function(req,res,next){
    Account.find({},function (err,data) {
        if(err){
            res.json({"status":false});
        }
        res.json(data);
    });
});
router.post('/users',function(req,res,next){
    /*let account = new Account({
     username: req.params.username,
     password : req.params.password
     });*/
        User.find({},function (err,data) {
            if(err){
                res.json({"status":false});
            }
            res.json(data);
        });

});

module.exports = router;