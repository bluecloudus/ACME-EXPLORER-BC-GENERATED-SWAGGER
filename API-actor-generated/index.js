'use strict';

var fs = require('fs'),
    http = require('http'),
    path = require('path');

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({
  strict: false
}));
var oasTools = require('oas-tools');
var jsyaml = require('js-yaml');
var serverPort = 8080;

var spec = fs.readFileSync(path.join(__dirname, '/api/oas-doc.yaml'), 'utf8');
var oasDoc = jsyaml.safeLoad(spec);

var options_object = {
  controllers: path.join(__dirname, './controllers'),
  loglevel: 'info',
  strict: false,
  router: true,
  validator: true
};

oasTools.configure(options_object);

// Initialize database before running the app
var db = require('./db');
db.connect(function (err, _db) {
  console.info('Initializing DB...');
  if(err) {
    console.error('Error connecting to DB!', err);
    return 1;
  } else {
    db.find({}, function (err, contacts) {
      if(err) {
        console.error('Error while getting initial data from DB!', err);
      } else {
        if (contacts.length === 0) {
          console.info('Empty DB, loading initial data...');
          db.init();
      } else {
          console.info('DB already has ' + contacts.length + ' contacts.');
      }
      }
    });
  }
});

oasTools.initialize(oasDoc, app, function() {
  http.createServer(app).listen(serverPort, function() {
    console.log("App running at http://localhost:" + serverPort);
    console.log("________________________________________________________________");
    if (options_object.docs !== false) {
      console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
      console.log("________________________________________________________________");
    }
  });
});

app.get('/info', function(req, res) {
  res.send({
    info: "This API was generated using oas-generator!",
    name: oasDoc.info.title
  });
});
