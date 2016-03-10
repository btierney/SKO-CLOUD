var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fh = require('fh-mbaas-api');

function regionsRoute() {
  var regions = new express.Router();
  regions.use(cors());
  regions.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  regions.get('/', function(req, res) {
    console.log(new Date(), 'In regions route GET / req.query=', req.query);
    var region = req.query && req.query.region ? req.query.region : 'all';
    getRegions(res);  
    // see http://expressjs.com/4x/api.html#res.json
    res.json({results: 'DING DING DING'});
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  regions.post('/', function(req, res) {
    console.log(new Date(), 'In getallscores route POST / req.body=', req.body);
    var region = req.body && req.body.region ? req.body.region : 'all';

    // see http://expressjs.com/4x/api.html#res.json
    getRegions(res);
    //res.json({results: 'DING DING DING'});
  });

  function getRegions(responder){
   //EMEA
      var regions = [
        { 'value': 'wemea'  , 'text': 'WEMEA'},
        { 'value': 'cene'   , 'text': 'CENE'},
        { 'value': 'telco'  , 'text': 'Telco Vertical'},
        { 'value': 'other'  , 'text': 'Other'}
    ];
    // LATIN AMERICA  
    // var regions = [{ 'value': 'latam'  , 'text': 'LATAM'}];
    // NORTH AMERICA
    //   var regions = [
    //    { 'value': 'wemea'  , 'text': 'WEMEA'},
    //    { 'value': 'cene'   , 'text': 'CENE'},
    //    { 'value': 'telco'  , 'text': 'Telco Vertical'},
    //    { 'value': 'other'  , 'text': 'Other'}
    //];     
    responder.json (regions);
  }    

 
  return regions;
}

module.exports = regionsRoute;
