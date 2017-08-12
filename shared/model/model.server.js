var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

// local db connection
// mongoose
//   .connect('mongodb://localhost/project', {useMongoClient: true})
//   .then(function () {
//     console.log("success connecting to local mongo.")
//   });

//database config
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
