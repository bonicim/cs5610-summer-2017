//using express with node js
var express = require('express');

// create an application as an Express application
var app = express();

// server config
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/'));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

// load the entry point for server side web services
require('./assignment/app')(app);

// install, looad, and condigure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// list routing api's via some js file
// user require() to get the API's