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
    });
  });
}


exports.getProjectById = function(id) {
  return new Promise((resolve, reject) => {
    Work.findById(id, (err, result) => {
      if(err) {
        return reject(Error('No project was found'));
      }
      return resolve(result);
    });
  });
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