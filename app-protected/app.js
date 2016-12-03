var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	path = require('path'),
	engine = require('ejs-locals');

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

var oauth2App = require('../app-oauth2/app-client');
oauth2App.setup(app);

var routes = require('./routes/index');
app.use('/', oauth2App.ensureAuthenticated, routes);

module.exports = app;
