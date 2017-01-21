class Role{
    admin(req,res){
        console.log('ça marche');
        if(!req.hasOwnProperty('user') || !req.user.loginHas('ADIMIN')){

            res.status(404).render('error',{status:404,message:"page Introuvable, vérifier le lien SVP"});
        }
    }
    user(req,res){
        if(!req.hasOwnProperty('user') || !req.user.loginHas('USER')){
            req.json({status:false,message:"non inscrit"})
        }
    }
}


module.exports=new Role();
