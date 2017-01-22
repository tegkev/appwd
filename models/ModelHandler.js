class ModelHandler  {

   getById(Model) {
        Model.findById(req.body._id, function (err, data) {
            if (err) {
                res.json({status: false, error: err});
            }
            res.json({status: true, offre: data})
        });
    }
   findAll(Model) {
       Model.find({}, function (err, data) {
           if (err) {
               res.json({status: false, error: err});
           }
           res.json({status: true, offre: data})
       });
   }
    save(Model) {
       req.body._auteur=req.user._id;
        new Model(req.body).save(function (err, data) {
            if (err) {
                res.json({status: false, error: err});
            }
            res.json({status: true, offre: data})

        });
    }
    update(Model){
        Model.where({_id : req.param.id}).update(req.body, function (err, data) {
            if (err) {
                res.json({status: false, error: err});
            }
            res.json({status: true, offre: data})
        });
    }
    remove(Model){
        Model.where({_id:req.param.id}).findOneAndRemove(function(err){
            if(err){
                res.json({status:false});
            }
            res.json(status,true);
        })
    }

}
module.exports=new ModelHandler();