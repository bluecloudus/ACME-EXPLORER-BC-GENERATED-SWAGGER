'use strict';

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbPort = process.env.DBPORT || '27017';
// Connection URL
const url = 'mongodb://localhost:' + dbPort;

// Database Name
const dbName = 'ACME-Explorer-generated';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

var _db;

//Creates the connection to the database
module.exports.connect = function connect(cb) {
    if (_db) {
        console.warn("Trying to create the DB connection again!");
        return cb(null, _db);
    }
    client.connect(function (err) {
        if (err) {
            console.error("Error connecting to DB!", err);
            process.exit(1);
        }
        _db = client.db(dbName).collection(dbName);
        return cb(null, _db);
    });

};

//Return the connection to the database if it was previously created
module.exports.getConnection = function getConnection() {
    assert.ok(_db, "DB connection has not been created. Please call connect() first.");
    return _db;
};

//Helper method to initialize the database with sample data
module.exports.init = function init() {
    var sampleActors = [
        {
            "name": "chanell",
            "surname": "salas",
            "email": "abcde.example@gmail.com",
            "password": "abcde",
            "phone": "809-565-8899",
            "address": "Almirante Ulloa",
            "role": "ADMINISTRATOR"
        },
        {
            "name": "faustino",
            "surname": "ayala",
            "email": "qwerty.example@gmail.com",
            "password": "zxcvb",
            "phone": "809-656-8899",
            "address": "Almirante Ulloa",
            "role": "ADMINISTRATOR"
        }

    ];
    return this.getConnection().insert(sampleActors);
};

//Executes the query and return the result in the callback function
module.exports.find = function find(query, cb) {
    return this.getConnection().find(query).toArray(cb);
};

//Inserts a new document in the database
module.exports.insert = function insert(doc, cb) {
    return this.getConnection().insert(doc, cb);
};

//Updates a document that matches the query
module.exports.update = function update(query, newDoc, cb) {
    return this.getConnection().update(query, newDoc, cb);
};

//Removes a document from the database
module.exports.remove = function remove(query, cb) {
    return this.getConnection().remove(query, function (err, res) {
        cb(err, res.result.n);
    });
};