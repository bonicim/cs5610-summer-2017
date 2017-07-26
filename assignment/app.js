// server-side services (this is where the api's live)
require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

// database config
var connectionString = undefined;
var connectionResponse = undefined;

if (process.env.MONGODB_URI) {
  connectionString = process.env.MONGODB_URI;
  connectionResponse = "Connected to REMOTE mongodb: ";
}
else {
  connectionResponse = "Failed to connect to REMOTE mongodb. ";
}

mongoose
  .connect(connectionString, {useMongoClient: true})
  .then(function() {
    console.log(connectionResponse, connectionString);
  })
  .catch(function (err) {
    console.log(connectionResponse, err);
  });
