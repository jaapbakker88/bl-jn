var express = require('express');
var router = express.Router();
var showdown = require('showdown');
var mongoose = require('mongoose'),
	Work = require('../models/work');

var workOld =  require('../data/work');

require('dotenv').config()

router.get('/', function(req, res){
  Work.find({}, function(err, work){
  	if(err) {
  		console.log(err);
  		res.render('index', {work: workOld});
  	} else {
  		res.render('index', {work: work});
  	}
  })
  
});

router.get('/about', function(req, res){
  res.render('about');
});

// router.get('/projects', function (req, res) {
//   res.send('projects overview');
// });

router.get('/projects/:slug', function(req,res){
	Work.find({slug: req.params.slug}, function(err, work){
		if(err || !work ) {
			console.log(err);
			res.redirect('/');
		} else {
      var converter         = new showdown.Converter();
      var backgroundHtml    = converter.makeHtml(work[0].background);
      work[0].background = backgroundHtml;
			res.render('project', {work: work[0]})
		}
	})
  
});

module.exports = router;