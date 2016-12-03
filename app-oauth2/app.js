var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    engine = require('ejs-locals'),
    session = require('express-session'),
    passport = require('passport'),
    database = require('./config/database'),
    MongoStore = require('connect-mongo')(session);

var routes = require('./routes');

database.connect();
var app = express();

var require_optional = require('../utils').require_optional;
var config = require_optional('../config') || {
    instance : 'default'
};
app.set('config', config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret : 'my secret',
    store : new MongoStore({ mongooseConnection: database.connection }),
    resave : true,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

module.exports = app;
