var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

// server-side services (this is where the api's live)
require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');


// database config
// database is mongodb
// mlab db created directly on mlab
// var remoteMongodb = 'mongodb://admin:admin1@ds157702.mlab.com:57702/webdev';

var localMongodb = 'mongodb://localhost/webdev';
// mlab created via heroku addon
var remoteMongodb =
  'mongodb://heroku_mg3l2wd3:17siibafb0d9u21s14n06oj74s@ds115583.mlab.com:15583/heroku_mg3l2wd3';


// connects first to 'localMongodb'
// if fail, then connects to 'remoteMongodb'
mongoose.connect(localMongodb, {useMongoClient: true},
  function (err) {
    callback(err);
  }
);

function callback(err) {
  if(err) {
    console.log("Failed to connect to localMongodb. Trying to connect to remoteMongodb. ", err);
    connectToRemoteMongodb();
  }
  else {
    console.log("Connected to LOCAL MongoDb");
  }
}

function connectToRemoteMongodb() {
  mongoose.connect(remoteMongodb, {useMongoClient: true},
    function (err) {
      if (err) {
        console.log("Failed to connect to remoteMongodb. ", err);
      } else {
        console.log("Connected to remoteMongodb");
      }
    }
  );
}

