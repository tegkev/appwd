class Role{
    admin(req,res,next) {
        if (!req.hasOwnProperty('user') || !req.user.loginHas('ADMIN')) {
                res.json({status: 404, message: "page Introuvable, vérifier le lien SVP"}).status(404);
            }else {
                next();
            }

    }

    user(req,res,next) {
            if (!req.hasOwnProperty('user')||!req.user.loginHas('USER')) {
                res.json({status: false, message: "veuillez vous connectez"});
            }else{
                next();
            }
    }

}


module.exports=new Role();
