module.exports = {
    setup : function(app){
        var session = require('express-session');
        var passport = require('passport');
        var database = require('../app-oauth2/config/database');
        var MongoStore = require('connect-mongo')(session);

        app.use(session({
            secret : 'my secret',
            store : new MongoStore({ mongooseConnection: database.connection }),
            resave : true,
            saveUninitialized : false
        }));
        app.use(passport.initialize());
        app.use(passport.session());
    },
    ensureAuthenticated : function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/oauth2/login');
    }
};
