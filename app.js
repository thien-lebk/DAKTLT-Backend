var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { resolve } = require('path');

var app = express();


//Tao csv
const createCsvWriter = require('csv-writer').createObjectCsvWriter;



//Cherio

const axios = require("axios");
const cheerio = require('cheerio')
async function scrape() {
  for (let index = 1; index < 11; index++) {
    
    //csv
    const csvWriter = createCsvWriter({
      path: `file-p${index}.csv`,
      header: [
        { id: 'id', title: 'id' },
        { id: 'href', title: 'href' },
        { id: 'title', title: 'title' },
        { id: 'img', title: 'img' },
        { id: 'price', title: 'price' },
        { id: 'area', title: 'area' },
        { id: 'location', title: 'location' },
        { id: 'content', title: 'content' },
        { id: 'date', title: 'date' }
      ]
    });
    



    async function fetchHTML(url) {
      const { data } = await axios.get(url)
      return cheerio.load(data)
    }
    const $ = await fetchHTML(`https://batdongsan.com.vn/nha-dat-ban/p${index}`)
    //ID
    var arrID = [];
    let cx = $('.iconSave')
    cx.each((i, e) => {

      arrID.push($(e).attr('data-productid'))
    })

    //href
    var arrHref = [];

     cx = $('.product-avatar')
    cx.each((i, e) => {

      arrHref.push($(e).attr('href'))
    })

    //arrTitle

    var arrTitle = [];

     cx = $('.product-title a')
    cx.each((i, e) => {
      // console.log($(e).attr('title'));
      arrTitle.push($(e).attr('title'))
    })

    //IMG

    var arrImg = [];
    cx = $('.product-avatar-img')
    cx.each((i, e) => {
      arrImg.push($(e).attr('src-lazy'))
    })

    //price
    var arrPrice = [];
    cx = $('.product-info .price')
    cx.each((i, e) => {
      arrPrice.push($(e).attr('data-price'))
    })

    //Area
    var arrArea = [];
    cx = $('.iconSave')
    cx.each((i, e) => {
      arrArea.push($(e).attr('data-area'))
    })

    //Location
    var arrLocation = [];
    cx = $('.product-info .location')
    cx.each((i, e) => {
      arrLocation.push($(e).text())
    })

    //Content
   var arrContent = [];
    cx = $('.product-content')
    cx.each((i, e) => {
      arrContent.push($(e).text())
    })

    //Date
   var arrDate = [];
   cx = $('.iconSave')
   cx.each((i, e) => {
    arrDate.push($(e).attr('data-datesort'))
   })

  //  console.log(arrID.length);
  //  console.log(arrHref.length);
  //  console.log(arrTitle.length);
  //  console.log(arrImg.length);
  //  console.log(arrPrice.length);
  //  console.log(arrArea.length);
  //  console.log(arrLocation.length);
  //  console.log(arrContent.length);
  //  console.log(arrDate.length);


  //Thêm data vào record
  var records = [];
  for (let i = 0; i < 20; i++) {
    let obj = { id: '', href: '', title: '', img: '', price: '', area: '', location: '', content: '', date: '' }
    obj.id = arrID[i];
    obj.href = arrHref[i];
    obj.title = arrTitle[i];
    obj.img = arrImg[i];
    obj.price = arrPrice[i];
    obj.area = arrArea[i];
    obj.location = arrLocation[i];
    obj.content = arrContent[i];
    obj.date = arrDate[i];
    // if(checkDate == 0) records.push(obj);
    records.push(obj);
  }
  
  //xuất file
 await csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
      console.log('...Done');
    });
    // console.log(checkDate);

  }
}
scrape();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
