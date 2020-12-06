var express = require('express');
var router = express.Router();

// tinh controller
const tinhController = require('../controllers/tinh-controller');
//Thien controller
const thienController = require('../controllers/thien-controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// tinh
router.post('/tinh1', tinhController.tinh1);
// router.post('/tinh2', tinhController.tinh2);


//Thien

router.post('/batdongsan', thienController.batdongsanDotCom);
router.post('/muabannhadat', thienController.muabannhadat);
router.post('/themvaodb', thienController.adddata);



module.exports = router;
