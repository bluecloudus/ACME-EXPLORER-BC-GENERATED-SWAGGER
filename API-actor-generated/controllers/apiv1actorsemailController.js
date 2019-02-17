'use strict'

var varapiv1actorsemailController = require('./apiv1actorsemailControllerService');

module.exports.findActorByemail = function findActorByemail(req, res, next) {
  varapiv1actorsemailController.findActorByemail(req.swagger.params, res, next);
};

module.exports.deleteActor = function deleteActor(req, res, next) {
  varapiv1actorsemailController.deleteActor(req.swagger.params, res, next);
};

module.exports.updateActor = function updateActor(req, res, next) {
  varapiv1actorsemailController.updateActor(req.swagger.params, res, next);
};