'use strict'
var db = require('../db');
module.exports.getActors = function getActors(req, res, next) {
  console.info("New GET request to /actors");
  db.find({}, function (err, actors) {
    if (err) {
      console.error('Error getting data from DB');
      res.sendStatus(500); // internal server error
    } else {
      console.info("Sending actors: " + JSON.stringify(actors, 2, null));
      res.send(actors);
    }
  });
};

module.exports.addActor = function addActor(req, res, next) {
  var newActors = req.actor.value;
  if (!newActors) {
    console.warn("New POST request to /actors/ without actors, sending 400...");
    res.sendStatus(400); // bad request
  } else {
    console.info("New POST request to /actors with body: " + JSON.stringify(newActors, 2, null));
    if (!newActors.name || !newActors.surname || !newActors.email
      || !newActors.password || !newActors.phone || !newActors.address
      || !newActors.role || !newActors.created) {
      console.warn("The actors " + JSON.stringify(newActors, 2, null) + " is not well-formed, sending 422...");
      res.sendStatus(422); // unprocessable entity
    } else {
      db.find({ "email": newActors.email }, function (err, actors) {
        if (err) {
          console.error('Error getting data from DB');
          res.sendStatus(500); // internal server error
        } else {
          if (actors.length > 0) {
            console.warn("The actors " + JSON.stringify(newActors, 2, null) + " already extis, sending 409...");
            res.sendStatus(409); // conflict
          } else {
            console.info("Adding actors " + JSON.stringify(newActors, 2, null));
            db.insert(newActors);
            res.sendStatus(201); // created
          }
        }
      });
    }
  }
};