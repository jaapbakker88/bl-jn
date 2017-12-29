var express = require('express');
var router = express.Router();

require('dotenv').config()

router.get('/', function(req, res){
  res.render('index');
});

router.get('/about', function(req, res){
  res.render('about');
});

router.get('/blog/post', function (req, res) {
  res.render('blogpost');
});


module.exports = router;