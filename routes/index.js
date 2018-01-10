var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
	Work = require('../models/work');

var work =  require('../data/work');

require('dotenv').config()

router.get('/', function(req, res){
  res.render('index', {work: work});
});

router.get('/about', function(req, res){
  res.render('about');
});

router.get('/projects', function (req, res) {
  res.send('projects overview');
});

router.get('/projects/:slug', function(req,res){
	Work.find({slug: req.params.slug}, function(err, work){
		if(err || !work ) {
			console.log(err);
			res.redirect('/');
		} else {
			res.render('project', {work: work[0]})
		}
	})
  
});

module.exports = router;