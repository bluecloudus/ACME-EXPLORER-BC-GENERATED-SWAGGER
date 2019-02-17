'use strict'
var db = require('../db');

module.exports.findActorByemail = function findActorByemail(req, res, next) {
  res.send({
    message: 'This is the mockup controller for findActorByemail'
  });
};

module.exports.deleteActor = function deleteActor(req, res, next) {
  res.send({
    message: 'This is the mockup controller for deleteActor'
  });
};

module.exports.updateActor = function updateActor(req, res, next) {  
  var email = req.email.value;
  if (!email) {
    console.warn("New GET request to /actors/:email without email, sending 400...");
    res.sendStatus(400); // bad request
  } else {
    console.info("New GET request to /actors/" + email);
    db.find({ "email": email }, function (err, filteredActors) {
      if (err) {
        console.error('Error getting data from DB');
        res.sendStatus(500); // internal server error
      } else {
        if (filteredActors.length > 0) {
          var actor = filteredActors[0]; //since we expect to have exactly ONE actor with this email
          console.info("Sending actor: " + JSON.stringify(actor, 2, null));
          res.send(actor);
        } else {
          console.warn("There are no actors with email " + email);
          res.sendStatus(404); // not found
        }
      }
    });
}
};