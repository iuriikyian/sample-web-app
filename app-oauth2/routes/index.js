var router = require('express').Router();
var authConfig = require('../config/auth-config');

router.get('/login', function(req, res){
    res.render('login.ejs', {
        instance : req.app.get('config').instance
    });
});

router.post('/login', authConfig.localLogin);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.post('/register', authConfig.localRegister);

router.get('/register', function(req, res){
    res.render('register.ejs', {
        instance : req.app.get('config').instance
    });
});

module.exports = router;
