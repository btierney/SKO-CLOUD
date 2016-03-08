var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fh = require('fh-mbaas-api');

function bettercallsaulRoute() {
  var bettercallsaul = new express.Router();
  bettercallsaul.use(cors());
  bettercallsaul.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  bettercallsaul.get('/', function(req, res) {
    console.log(new Date(), 'In hello route GET / req.query=', req.query);
    var world = req.query && req.query.hello ? req.query.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Hello ' + world});
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  bettercallsaul.post('/', function(req, res) {
    console.log(new Date(), 'In bettercallsaul route POST / req.body=');
    //var world = req.body && req.body.hello ? req.body.hello : 'World';
    var testEntry = req.body;
    console.log ("email:   " + testEntry.email);
    console.log ("region:  " + testEntry.region);
    console.log ("answers: " + testEntry.answers);
    console.log ("score:   " + testEntry.score);
    addTestResult (testEntry, res);
    // see http://expressjs.com/4x/api.html#res.json
    //res.json({msg: 'Thanks for your submisison'});
  });

function addTestResult (testEntry, response){
// Create a single entry/row
  var _date = new Date();
  var options = {
  "act": "create",
  "type": "SKO", // Entity/Collection name
  "fields": { // The structure of the entry/row data. A data is analogous to "Row" in MySql or "Documents" in MongoDB
    "email"   : testEntry.email,
    "region"  : testEntry.region,
    "answers" : testEntry.answers,
    "score"   : testEntry.score,
    "_date"   : _date
  }
};
    
fh.db(options, function (err, data) {
  if (err) {
    console.error("Error " + err);
    response.json ({msg : "Error saving data"});
  } else {
    console.log(JSON.stringify(data));
    response.json ({msg : "Thanks for playing!"});
  }
});    
}    
    
  return bettercallsaul;
}

module.exports = bettercallsaulRoute;
