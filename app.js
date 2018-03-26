// 외부 모듈 추출
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');
var passport = require('passport');
var session = require('express-session');
// 사용자 정의 모듈 추출


// 서버 생성
var app = express();

// 서버 설정 - view engine setup
// 일반 test 시
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// react build folder 이용시 ( 파일 위치 고려하기 )
// app.set('views', path.join(__dirname, '../SoloEscape_Web_Client/build'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');


// configuration ===============================================================

// 미들웨어 설정
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// var configDB = require('./config/database.js');
//
// var connection = mysql.createConnection(configDB); // connect to database
//
// connection.connect((err) => {
//   if(err) {
//       console.log(err);
//       return;
//   }
//   console.log( 'mysql connect completed' );
// });

app.get('/profile', function(req, res){
  connection.query('SELECT * from profile', function(err, rows) {
    if(err) throw err;
    res.send(rows);
  });
});

app.get('/profile/:user_id', function(req, res){
  var user_id = req.params.user_id;
  connection.query('SELECT * from profile WHERE user_id = ?', [user_id], function(err, rows) {
    if(err) throw err;
    res.send(rows);
  });
});

app.get('/match', function(req, res){
  connection.query('SELECT * from match', function(err, rows) {
    if(err) throw err;
    res.send(rows);
  });
});

app.get('/match/:user_id', function(req, res){
  var user_id = req.params.user_id;
  connection.query('SELECT * from match WHERE user_id = ?', [user_id], function(err, rows) {
    if(err) throw err;
    res.send(rows);
  });
});

app.get('/tag', function(req, res){
  connection.query('SELECT * from tag', function(err, rows) {
    if(err) throw err;
    res.send(rows);
  });
});

app.get('/tag/:tag_id', function(req, res){
  var tag_id = req.params.tag_id;
  connection.query('SELECT * from tag WHERE tag_id = ?', [tag_id], function(err, rows) {
    if(err) throw err;
    res.send(rows);
  });
});

app.get('/user_to_tag', function(req, res){
  connection.query('SELECT * from user_to_tag', function(err, rows) {
    if(err) throw err;
    res.send(rows);
  });
});

app.get('/user_to_tag/:user_id', function(req, res){
  var user_id = req.params.user_id;
  connection.query('SELECT * from profile WHERE user_id = ?', [user_id], function(err, rows) {
    if(err) throw err;
    res.send(rows);
  });
});


require('./config/passport')(passport); // pass passport for configuration

// required for passport
app.use(passport.initialize());
app.use(passport.session());  //persistent login session


// routes ======================================================================

require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// 에러 핸들러 ======================================================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});



// 모듈화
module.exports = app;
