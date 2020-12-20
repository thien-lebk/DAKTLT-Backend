var express = require('express');
var router = express.Router();

// tinh controller
const tinhController = require('../controllers/tinh-controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// tinh
router.post('/tinh1', tinhController.tinh1);
// router.post('/tinh2', tinhController.tinh2);

router.get('/getall', tinhController.getall);
router.get('/searchtitle', tinhController.searchTitle);

router.get('/cleanaddress', tinhController.cleanAddress);  //Làm sạch địa chỉ
router.get('/fixaddress', tinhController.fixAddress);  //Làm sạch địa chỉ
router.get('/findnotadd', tinhController.findnotadd);  //Tim chua co add
router.get('/batdongsan321', tinhController.batdongsan321);  //lam lai bds123.com
router.get('/batdongsan', tinhController.batdongsan);  //lam lai bds123.com

module.exports = router;
