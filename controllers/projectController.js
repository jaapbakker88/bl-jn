const mongoose = require('mongoose');
const Work = require('../models/work');
const showdown  = require('showdown');


exports.getProjects = function () {
  return new Promise((resolve, reject) => {
    Work.find({}, (err, result) => {

      if(err) {
        return reject(Error('No projects were found!'));
      } 
      return resolve(result);
    })
  })
}


// exports.getProjects = function (req, res) {
//     const p = new Promise((resolve, reject) => {
//       resolve();
//     })
//     res.send(p)
//     // Work.find({}, function(err, works) {
//     //   if(err) {
//     //     console.log(err)
//     //   } else {
//     //     res.render('admin/index', {work: works})
//     //   }
//     // })

//     // res.send('/GET API Works')
// }

exports.getProject = function (req, res) {
    res.send('/GET API Works')
}

exports.createProject = function (req, res) {
    res.send('/POST API Works')
}

exports.updateProject = function (req, res) {
    res.send('/PUT API Works')
}

exports.destroyProject = function (req, res) {
    res.send('/DELETE API Works')
}