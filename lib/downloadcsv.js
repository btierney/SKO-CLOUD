var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fh = require('fh-mbaas-api');

function downloadcsvRoute() {
  var downloadcsv = new express.Router();
  downloadcsv.use(cors());
  downloadcsv.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  downloadcsv.get('/', function(req, res) {
    console.log(new Date(), 'In getallscores route GET / req.query=', req.query);
    //var region = req.query && req.query.region ? req.query.region : 'all';
    getResults(res, region);  
    // see http://expressjs.com/4x/api.html#res.json
    //res.json({results: 'DING DING DING'});
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  downloadcsv.post('/', function(req, res) {
    console.log(new Date(), 'In getallscores route POST / req.body=', req.body);
    var region = req.body && req.body.region ? req.body.region : 'all';

    // see http://expressjs.com/4x/api.html#res.json
    getResults(res, region);
    //res.json({results: 'DING DING DING'});
  });

  function getResults(responder, region){
    
    var options = {
      "act" : "list",
      "type" : "SKO"
    };
    
    fh.db (options, function (err, data) {
      if (err) {
        console.error ("Error: " + err);
      } else {
        console.log (data);
        //responder.json(data);
        simplifyData(responder,data);
      }
    });
  }    

  function simplifyData(responder, data){
      var count = 0;
      var results = [];
      var SKO = data.list;
      var len = data.list.length;
      for (; count < len; count++){
          var q = SKO[count].fields;
          results.push(q);
      }
      console.log(results);
      //responder.json(results);
      generateCSV(responder, results);
  }    
  
    function generateCSV(responder ,jsonData){
    // [
    // {"email":"mphekps@redhat.com","region":"wemea","answers":"5, 2, 1, 1, 2, 2, 2, 3, 2, 1","score":5,"_date":"2016-03-08T22:16:42.658Z"},
    // {"email":"erockwel@redhat.com","region":"wemea","answers":"1, 2, 3, 3, 3, 4, 2, 2, 2, 1","score":8,"_date":"2016-03-08T22:16:42.658Z"}
    // ]
        var csv = 'email, region, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, score, date\n';
        var count = 0;
        var len = jsonData.length;
        for (; count<len; count++){
            csv += jsonData[count].email + ', ';
            csv += jsonData[count].region + ', ';
            csv += jsonData[count].answers.split(",") + ', ';
            csv += jsonData[count].score + ', ';
            csv += jsonData[count]._date;
            csv += '\n';
        }
        console.log(csv);
        responder.json(csv)
    }
  
  return downloadcsv;
}

module.exports = downloadcsvRoute;
