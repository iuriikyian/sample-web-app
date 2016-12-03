var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

// required to access session
var localRegisterInit = function(req, email, password, callback){
    User.findOne({'local.email' : email}, function(err, user){
        if(err){
            console.log(err);
            return callback(err);
        }
        if(user){ // already exists
            console.log('user already exists');
            return callback(null, false);
        }
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.hashPassword(password);

        console.log('saving new user');
        newUser.save(function(err){
            if(err){
                console.log(err);
                throw err;
            }
            // this will automatically log in the new created user with passport
            return callback(null, newUser);
        });
    });
};

var localLoginInit = function(req, email, password, callback){
    User.findOne({'local.email' : email}, function(err, user){
        if(err){
            return callback(err);
        }
        if(!user || !user.validatePassword(password)){ // not exists
            return callback(null, false);
        }
        return callback(null, user);
    });
};

var localOptions = {
    usernameField : 'emailAddress',
    passReqToCallback : true
};

passport.use('local-register', new LocalStrategy(localOptions, localRegisterInit));
passport.use('local-login', new LocalStrategy(localOptions, localLoginInit));

passport.serializeUser(function(user, callback){
    callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
    User.findById(id, function(err, user){
        callback(err, user);
    });
});

module.exports = {
    localRegister : passport.authenticate('local-register', {
        successRedirect : '/',
        failureRedirect : '/oauth2/register'
    }),
    localLogin : passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/oauth2/login'
    })
};
