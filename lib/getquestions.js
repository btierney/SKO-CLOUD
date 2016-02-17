var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fh = require('fh-mbaas-api');

function getquestionsRoute() {
  var getquestions = new express.Router();
  getquestions.use(cors());
  getquestions.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  getquestions.get('/', function(req, res) {
    console.log(new Date(), 'In getquestions route GET / req.query=', req.query);
    //var world = req.query && req.query.hello ? req.query.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    //res.json({msg: 'Hello ' + world});
    getTestQuestions(res);

  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  getquestions.post('/', function(req, res) {
    console.log(new Date(), 'In getquestions route POST / req.body=', req.body);
    //var world = req.body && req.body.hello ? req.body.hello : 'World';
    getTestQuestions(res)
      
    // see http://expressjs.com/4x/api.html#res.json
    //res.json({msg: 'Hello ' + world});
  });
    
    // RETRIEVE QUESTIONS FROM MONGO DB STORAGE
    
  function getTestQuestions(responder){
    
    var options = {
      "act" : "list",
      "type" : "testquestions"
    };
    
    fh.db (options, function (err, data) {
      if (err) {
        console.error ("Error: " + err);
      } else {
        console.log (data);
        responder.json(data.list);
      }
    });
  }
  return getquestions;
}

module.exports = getquestionsRoute;
  


