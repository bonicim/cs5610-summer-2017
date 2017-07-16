var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var localMongodb = 'mongodb://localhost/webdev';
var remoteMongodb = 'mongodb://admin:admin1@ds157702.mlab.com:57702/webdev';

mongoose
  .connect(localMongodb, {useMongoClient: true})
  .then(
    function() {
      console.log("Successful connection to local MongoDb.");
    },
    function (err) {
      console.log("Cannot connect to local MongoDb");
    }
  );

//
// mongoose
//   .connect(localMongodb, {useMongoClient: true},
//     function (err) {
//       if(err) {
//         mongoose.connect(remoteMongodb, {useMongoClient: true},
//           function (err) {
//             if(err) {
//               console.log("Complete db connection failure");
//             } else {
//               console.log("Connected to REMOTE MongoDb");
//             }
//
//           });
//       } else {
//         console.log("Connected to LOCAL MongoDb");
//       }
//   });

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');