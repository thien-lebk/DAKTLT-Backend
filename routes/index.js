var express = require('express');
var router = express.Router();

//Thien controller
const thienController = require('../controllers/thien-controller');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/batdongsan', thienController.batdongsanDotCom);
router.post('/muabannhadat', thienController.muabannhadat);



module.exports = router;
