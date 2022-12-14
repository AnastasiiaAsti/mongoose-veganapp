var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');

require('dotenv').config()

require('./config/database')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cocktailsRouter = require('./routes/cocktails');
const veggiesRouter = require('./routes/veggies');
const grandmasRouter = require('./routes/grandmas');
const soupsRouter = require('./routes/soups');
const tapasRouter = require('./routes/tapas');
const ayurvedasRouter = require('./routes/ayurvedas');

var app = express();

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
app.use('/cocktails', cocktailsRouter);
app.use('/veggies', veggiesRouter);
app.use('/grandmas', grandmasRouter);
app.use('/soups', soupsRouter);
app.use('/tapas', tapasRouter);
app.use('/ayurvedas', ayurvedasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
