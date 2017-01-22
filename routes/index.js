var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
   res.render('index');
});
router.get('/test',function (req, res) {
   res.render('sendfile');
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
