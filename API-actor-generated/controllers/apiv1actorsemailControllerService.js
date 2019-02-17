'use strict'
var db = require('../db');

module.exports.updateActor = function updateActor(req, res, next) {
  var updatedActor = req.actor.value;
  var email = req.email.value;
  if (!updatedActor) {
    console.warn("New PUT request to /actors/ without actor, sending 400...");
    res.sendStatus(400); // bad request
  } else {
    console.info("New PUT request to /actors/" + email +
      " with data " + JSON.stringify(updatedActor, 2, null));
    if (!updatedActor.name || !updatedActor.surname || !updatedActor.email ||
      !updatedActor.password || !updatedActor.phone || !updatedActor.address ||
      !updatedActor.role || !updatedActor.created) {
      console.warn("The actor " +
        JSON.stringify(updatedActor, 2, null) +
        " is not well-formed, sending 422...");
      res.sendStatus(422); // unprocessable entity
    } else {
      db.find({ "email": updatedActor.email }, function (err, actors) {
        if (err) {
          console.error('Error getting data from DB');
          res.sendStatus(500); // internal server error
        } else {
          if (actors.length > 0) {
            db.update({ email: email }, updatedActor);
            console.info("Modifying actor with email " + email + " with data "
              + JSON.stringify(updatedActor, 2, null));
            res.send(updatedActor); // return the updated actor
          } else {
            console.warn("There are not any actor with email " + email);
            res.sendStatus(404); // not found
          }
        }
      });
    }
  }
};