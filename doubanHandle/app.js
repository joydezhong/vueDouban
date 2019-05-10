let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');

let app = express();

// allow cross
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8082');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCrossDomain);

// import route
let router = express.Router();

let bookLists = require('./routes/bookLists');
let bookRemove = require('./routes/bookRemove');
let bookUpdate = require('./routes/bookUpdate');
let bookAdd = require('./routes/bookAdd');
let bookDetails = require('./routes/bookDetails');

let userAuth = require('./routes/userAuth');
let loginAuth = require('./routes/loginAuth');

//connect mongoDB
let mongoose = require('mongoose');
let mongoURL = 'mongodb://localhost/DoubanHandle';
mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error:'));


let bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
// outport api
app.use('/api/books/bookLists', bookLists);
app.use('/api/books/removeBook', bookRemove);
app.use('/api/books/updateBook', bookUpdate);
app.use('/api/books/addBook', bookAdd);
app.use('/api/books/bookDetails', bookDetails);


//使用注册
app.use('/api/register', userAuth);
//使用登陆
app.use('/api/login', loginAuth);


module.exports = app;
