var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Protected Area',
      user : req.user,
      instance : req.app.get('config').instance
  });
});

module.exports = router;
