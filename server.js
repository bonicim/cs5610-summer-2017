//gets a Express singleton
var app = require('./express');

// server config
app.set('port', (process.env.PORT || 5000));
app.use(app.express.static(__dirname+'/'));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

// load the entry point for server side web services
require('./assignment/app');

// install, looad, and condigure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// list routing api's via some js file
// user require() to get the API's