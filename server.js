// load libraries
var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


// server config
app.set('port', (process.env.PORT || 5000));
app.use(app.express.static(__dirname+'/'));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

// configure libraries
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// configuration for cookies, session, passport must happen in that order; there are dependencies
app.use(cookieParser()); //  Step 1: cookieParser MUST be created before session
app.use(session({
  secret: "foobar",
  resave: true,
  saveUninitialized: true
})); // Step 2: 'secret' is required; used to sign & encrypt cookie; resave, saveUninitialized must be defined
     //  process.env.SESSION_SECRET
app.use(passport.initialize()); // Step 3:
app.use(passport.session()); // Step 4:



// server side web services and database services
require('./assignment/app');
//require('./sandbox/session/session');


