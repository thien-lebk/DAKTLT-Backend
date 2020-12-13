var express = require('express');
var router = express.Router();

// tinh controller
const tinhController = require('../controllers/tinh-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getall', tinhController.getall);
router.get('/searchtitle', tinhController.searchTitle);

// tinh
router.post('/tinh1', tinhController.tinh1);
// router.post('/tinh2', tinhController.tinh2);




module.exports = router;
