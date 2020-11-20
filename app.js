var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Them webdriver
var webdriver = require('selenium-webdriver'), By = webdriver.By;
var driver = new webdriver.Builder().forBrowser('chrome').build();

driver.get('file://' + __dirname + '/views/Example.html');
Pause(2, ScrapeExample);
async function ScrapeExample() {
  console.log("Scrapping page ...");
  Pause(3, QuitDriver);
  //In ra cac gender
  // a = await driver.findElements(By.name('gender'))
  // console.log("leng a = ");
  // console.log(a.length);
  // a.forEach(async (ele) => {
  //   b = await ele.getAttribute("value");;
  //   console.log("---");
  //   console.log(b);
  // })
 
  //In ra cac checkbox
  //In ra cac fruits
  //c1
          a = await driver.findElements(By.id('fruits'))
          console.log("leng a = ");
          console.log(a.length);
          a.forEach(async (ele) => {
            b = await ele.getText();
            console.log("---");
            console.log(b);
          })
  //c2
          // driver.findElements(By.id('fruits')).then(function(ele1){
          //   for (const ele2 of ele1) {
          //     ele2.getText().then(function(ele3){
          //       console.log(ele3);
          //     })
          //   }
          // })
  //In ra cac Idcars
  //In ra url


}
function Pause(time, functionName) {
  setTimeout(functionName, time * 1000);
}
function QuitDriver() {
  driver.close();
  driver.quit();
}


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
