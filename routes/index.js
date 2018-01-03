var express = require('express');
var router = express.Router();

require('dotenv').config()

router.get('/', function(req, res){
  res.render('index');
});

router.get('/about', function(req, res){
  res.render('about');
});

router.get('/projects', function (req, res) {
  res.send('projects overview');
})

router.get('/projects/:slug', function(req,res){
  res.send('project page of: ' + req.params.slug);
})


module.exports = router;