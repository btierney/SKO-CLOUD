var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

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
    console.log(new Date(), 'In bettercallsaul route POST / req.body=', req.body);
    //var world = req.body && req.body.hello ? req.body.hello : 'World';
    console.log ("email:   " + body.email);
    console.log ("region:  " + body.region);
    console.log ("answers: " + body.answers);
    console.log ("score:   " + body.scoore);
      
    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Thanks for your submisison'});
  });

  return bettercallsaul;
}

module.exports = bettercallsaulRoute;
