var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fh = require ('fh-mbaas-api');

function verifyemailRoute() {
  var verifyemail = new express.Router();
  verifyemail.use(cors());
  verifyemail.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  verifyemail.get('/', function(req, res) {
    console.log(new Date(), 'In hello route GET / req.query=', req.query);
    var world = req.query && req.query.hello ? req.query.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Hello ' + world});
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  email.post('/', function(req, res) {
    console.log(new Date(), 'In hello route POST / req.body=', req.body);
    var body = req.body && req.body.email ? req.body.email : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    //res.json({msg: 'Email exists', submitted : true});
    checkSubmissions(res, body);
  });
    
  function checkSubmissions( response, email ) {
      var options = {
      "act": "list",
      "type": "SKO", // Entity/Collection name
      "eq": {
          "email": email
      };

    fh.db(options, function (err, data) {
      if (err) {
        console.error("Error " + err);
        response.json ({msg : "Error saving data"});
      } else {
        console.log(JSON.stringify(data));
        response.json (data));
      }
    });    
  } // END CHECK SUBMISSIONS
    
  return verifyemail;
}

module.exports = verifyemailRoute;
