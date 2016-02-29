var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function getallscoresRoute() {
  var getallscores = new express.Router();
  getallscores.use(cors());
  getallscores.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  getallscores.get('/', function(req, res) {
    console.log(new Date(), 'In getallscores route GET / req.query=', req.query);
    var region = req.query && req.query.region ? req.query.region : 'all';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({results: 'DING DING DING'});
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  getallscores.post('/', function(req, res) {
    console.log(new Date(), 'In getallscores route POST / req.body=', req.body);
    var region = req.body && req.body.region ? req.body.region : 'all';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({results: 'DING DING DING'});
  });

  return getallscores;
}

module.exports = getallscoresRoute;
