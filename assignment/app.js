// server-side services (this is where the api's live)
require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

// database config

// Local connection String
// var connectionString;
//
// if (process.env.MONGO_LOCAL) {
//   connectionString = process.env.MONGO_LOCAL;
// }
// else if (process.env.MLAB_USERNAME && process.env.MLAB_PASSWORD) {
//   connectionString = process.env.MLAB_USERNAME + ":" +
//     process.env.MLAB_PASSWORD + "@" +
//     process.env.MLAB_HOST + ':' +
//     process.env.MLAB_PORT + '/' +
//     process.env.MLAB_APP_NAME;
// }
//
// mongoose.connect(connectionString, {useMongoClient: true});
//
// var db = mongoose.connection;
//
// console.log(" Connected with mongo db ");



//var localMongodb = 'mongodb://localhost/webdev';
var remoteMongodb = process.env.MONGODB_URI;

// connects first to 'localMongodb'
// if fail, then connects to 'remoteMongodb'
mongoose
  .connect(remoteMongodb, {useMongoClient: true})
  .then(function() {
    console.log("Connected to REMOTE MongoDb");
  })
  .catch(function (err) {
    console.log("Failed to connect to remoteMongodb. ", err);
  });











//
//   function (err) {
//     callback(err);
//   }
// );
//
// function callback(err) {
//   if(err) {
//     console.log("Failed to connect to localMongodb. Trying to connect to remoteMongodb. ", err);
//     connectToRemoteMongodb();
//   }
//   else {
//     console.log("Connected to LOCAL MongoDb");
//   }
// }
//
// function connectToRemoteMongodb() {
//   mongoose.connect(remoteMongodb, {useMongoClient: true},
//     function (err) {
//       if (err) {
//         console.log("Failed to connect to remoteMongodb. ", err);
//       } else {
//         console.log("Connected to remoteMongodb");
//       }
//     }
//   );
// }

