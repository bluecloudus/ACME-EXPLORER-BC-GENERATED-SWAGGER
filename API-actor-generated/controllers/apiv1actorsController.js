'use strict'

var varapiv1actorsController = require('./apiv1actorsControllerService');

module.exports.getActors = function getActors(req, res, next) {
  varapiv1actorsController.getActors(req.swagger.params, res, next);
};

module.exports.addActor = function addActor(req, res, next) {
  varapiv1actorsController.addActor(req.swagger.params, res, next);
};