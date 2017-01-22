class ModelHandler  {

   getById(req,res,Model) {
        Model.findById(req.body._id, function (err, data) {
            if (err) {
                res.json({status: false, error: err});
            }
            res.json({status: true, data: data})
        });
    }
   findAll(req,res,Model) {
       Model.find({}, function (err, data) {
           if (err) {
               res.json({status: false, error: err});
           }
           res.json({status: true, data: data})
       });
   }
    save(req,res,Model) {
       console.log("id user est "+req.user._id);
       req.body._auteur=req.user._id;
        new Model(req.body).save(function (err, data) {
            if (err) {
                res.json({status: false, error: err});
            }else{
                res.json({status: true, data: data})
            }

        });
    }
    update(req,res,Model){
        Model.where({_id : req.param.id}).update(req.body, function (err, data) {
            if (err) {
                res.json({status: false, error: err});
            }
            res.json({status: true, data: data})
        });
    }
    remove(req,res,Model){
        Model.where({_id:req.param.id}).findOneAndRemove(function(err){
            if(err){
                res.json({status:false});
            }
            res.json(status,true);
        })
    }

}
module.exports=new ModelHandler();