var express = require('express');
var router = express.Router();

var projectController = require('../controllers/projectController');
var postController = require('../controllers/postController');


// WORK
router.get('/projects', (req, res) => {
  projectController.getProjects()
    .then(projects => res.json(projects))
    .catch(err => err);
});

router.get('/projects/:id', projectController.getProject);
router.post('/projects', projectController.createProject);
router.put('/projects/:id/edit', projectController.updateProject);
router.delete('/projects/:id', projectController.destroyProject);

// // BLOG
// router.get('/posts', postController.getPosts);
// router.get('/posts/:id', postController.getPost);
// router.post('/posts', postController.createPost);
// router.put('/posts/:id/edit', postController.updatePost);
// router.delete('/posts/:id', postController.destroyPost);

module.exports = router;