var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'),
	multer = require('multer'),
    cloudinary = require('cloudinary'),
    cloudinaryStorage = require('multer-storage-cloudinary'),
	Work = require('../models/work');

var showdown  = require('showdown');

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

router.get('/work/:id', function(req, res) {
	Work.findById(req.params.id, function(err, work) {
		if(err || !work) {
			console.log(err);
			res.redirect('/admin');
		} else {
			res.render('admin/edit', {work: work})
		}
	})
})

router.get('/work/:id/gallery', function(req, res) {
	Work.findById(req.params.id, function(err, work) {
		if(err || !work) {
			console.log(err);
			res.redirect('/admin');
		} else {
			res.render('admin/gallery', {work: work})
		}
	})
})

router.get('/work/:id/screenshots', function(req, res) {
	Work.findById(req.params.id, function(err, work) {
		if(err || !work) {
			console.log(err);
			res.redirect('/admin');
		} else {
			res.render('admin/screenshots', {work: work})
		}
	})
})

router.put('/work/:id/screenshots', upload.single('image'), function(req, res) {
	if(req.file.secure_url) {
		Work.update(
	    	{ _id: req.params.id },
	    	{ $push: { screenshots: {name: req.file.name, url: req.file.secure_url } } }, function(err, work){
	    	if (err) {
	    		console.log(err)
	    		res.redirect('back');
	    	} else {
	    		res.redirect('back');
	    	}
	    });
	} else {
		res.redirect(`/admin/work/${req.params.id}/gallery`)
	}
});


//// DELETE GAlLERY ITEM
router.delete('/work/:id/gallery/:item', function(req, res) {
	
	Work.update({ _id : req.params.id },{ $pull : {'gallery' : { '_id' : req.params.item } } }, function(err, work){
		if(err) {
			console.log(err)
			res.redirect('back');
		} else {
			res.redirect('back');
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
	var newWorkItem 			= req.body['work']
	var tags 					= req.body['tags'].split(', ');
	var backgroundMarkdown 		= req.body['background'];
	
	newWorkItem.tags = tags;
	newWorkItem.background = backgroundMarkdown;
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