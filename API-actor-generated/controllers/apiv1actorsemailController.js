'use strict'

var varapiv1actorsemailController = require('./apiv1actorsemailControllerService');

module.exports.updateActor = function updateActor(req, res, next) {
  varapiv1actorsemailController.updateActor(req.swagger.params, res, next);
};