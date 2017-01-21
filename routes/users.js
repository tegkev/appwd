var express = require('express');
var router = express.Router();
var User = require('../models/UserModel');

var auth = function(req,res,next){
    console(req.session.user);
    next();
}

/* GET users listing. */
router.get('/',auth,function(req, res, next) {

});

module.exports = router;
