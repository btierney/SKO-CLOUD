var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');

// list the endpoints which you want to make securable here
var securableEndpoints;
securableEndpoints = ['/hello', '/bettercallsaul', '/getquestions', '/regions', '/downloadcsv'];

var app = express();

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);

// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

app.use('/hello', require('./lib/hello.js')());
app.use('/bettercallsaul', require ('./lib/bettercallsaul.js')());
app.use('/getquestions', require ('./lib/getquestions.js')());
app.use('/verifyemail', require ('./lib/verifyemail.js')());
app.use('/getallscores', require('./lib/getallscores.js')());
app.use('/rollupscores', require('./lib/rollupscores.js')());
app.use('/downloadcsv', require('./lib/downloadcsv.js')());
app.use('/regions', require('./lib/regions.js')());

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port); 
});
