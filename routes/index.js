var express = require('express');
var router = express.Router();

//Thien controller
const thienController = require('../controllers/thien-controller');
const {
  batdongsan321Controller
} = require('../controllers/tuan-controller');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


router.post('/batdongsan', thienController.batdongsanDotCom);
router.post('/muabannhadat', thienController.muabannhadat);
router.post('/batdongsan321', batdongsan321Controller);



module.exports = router;