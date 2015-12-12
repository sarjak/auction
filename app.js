var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/*
var routes = require('./routes/index');
var users = require('./routes/users');
var channels = require('./routes/channels');
var documents=require('./routes/documents');
var subscription=require('./routes/subscriptions');
var companies = require('./routes/companies');
var categories = require('./routes/categories');
var comments = require('./routes/comments');
var coupons = require('./routes/coupons');
var likes = require('./routes/likes');
var feedbacks = require('./routes/feedbacks');*/

// Connection to mongodb
var mongoose = require('mongoose');
// var dburi="mongodb://test:test@ds041404.mongolab.com:41404/test_discount";
/*var dburi = "mongodb://backend:backend@ds045054.mongolab.com:45054/bidbucks_dev";
var db=mongoose.connect(dburi);*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-Type","application/json");  
  next();
});
/*
app.use('/', routes);
app.use('/users', users);
app.use('/channels', channels);
app.use('/company',companies);
app.use('/categories',categories);
app.use('/comments',comments);
app.use('/documents', documents);
app.use('/feedbacks', feedbacks);
app.use('/subscriptions',subscription);
app.use('/coupons',coupons);
app.use('/likes',likes);
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
     // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
      res.writeHead(200,{"Access-Control-Allow-Origin" : "*"});
      res.end();
    }
    else {
      next();
    }

};
app.use(allowCrossDomain);*/



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

console.log("Server Started");