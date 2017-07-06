// load libraries
var app = require('./express');
var bodyParser = require('body-parser');

// server config
app.set('port', (process.env.PORT || 5000));
app.use(app.express.static(__dirname+'/'));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

// install, load, and configure body parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// load the entry point for server side web services
require('./assignment/app');


