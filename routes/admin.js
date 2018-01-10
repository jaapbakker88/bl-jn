var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'),
	multer = require('multer'),
    cloudinary = require('cloudinary'),
    cloudinaryStorage = require('multer-storage-cloudinary'),
	Work = require('../models/work');

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'bakker-labs',
  allowedFormats: ['jpg', 'png']
});
var upload = multer({ storage: storage });

router.get('/', function(req,res) {
	Work.find({}, function(err, works) {
		if(err) {
			console.log(err)
		} else {
			res.render('admin/index', {work: works})
		}
	})
	
});

router.post('/work/add', upload.single('image'), function(req, res) {
	var newWorkItem = req.body['work']
	if (req.file) {
		newWorkItem.image = req.file.secure_url;
	}
	Work.create(newWorkItem, function(err, work) {
		if(err) {
			console.log(err) 
		} else {
			res.redirect('/admin')
		}
	});
});

router.get('/work/:id/edit', function(req, res) {
	Work.findById(req.params.id, function(err, work) {
		if(err || !work) {
			console.log(err);
			res.redirect('/admin');
		} else {
			res.render('admin/edit', {work: work})
		}
	})
})

router.put('/work/:id/edit', upload.single('image'), function(req, res) {
	var newWorkItem = req.body['work']
	if (req.file) {
		newWorkItem.image = req.file.secure_url;
	}
	Work.findByIdAndUpdate(req.params.id, newWorkItem, function(err, work) {
		if(err || !work) {
			console.log(err);
			res.redirect('/admin');
		} else {
			res.redirect(`/admin/work/${work.id}/edit`);
		}
	});	
});

router.delete('/work/:id/delete', function(req, res) {
	Work.findByIdAndRemove(req.params.id, function(err) {
		if(err || !work) {
			console.log(err);
			res.redirect('/admin');
		} else {
			res.redirect('/admin');
		}
	});	
});

module.exports = router;