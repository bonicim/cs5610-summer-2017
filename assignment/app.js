// server-side services (this is where the api's live)
require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

// database config
//var localMongodb = 'mongodb://localhost/webdev';
var remoteMongodb = process.env.MONGODB_URI;

mongoose
  .connect(remoteMongodb, {useMongoClient: true})
  .then(function() {
    console.log("Connected to REMOTE MongoDb");
  })
  .catch(function (err) {
    console.log("Failed to connect to remoteMongodb. ", err);
  });
