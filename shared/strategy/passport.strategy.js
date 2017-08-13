var passport = require('passport');
var userModel = require('../model/models/user.model.server');
var bcrypt = require('bcrypt-nodejs');

var LocalStrategy = require('passport-local').Strategy;

// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var googleConfig = {
//   clientID     : process.env.GOOGLE_CLIENT_ID,
//   clientSecret : process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL  : process.env.GOOGLE_CALLBACK_URL
// };

// var FacebookStrategy = require('passport-facebook').Strategy;
// var facebookConfig = {
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//   profileFields: ['id', 'emails', 'displayName', 'name']
// };

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new LocalStrategy(localStrategy)); // passport will authenticate based on strategy defined by 'localStrategy' function
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
// passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

module.exports = passport;

// these functions are called after authentication succeeds
// cookie is used to keep data in client browser
// cookies is encrypted on the client side
// create hooks to store and retrieve things in cookie
// decides what to store
function serializeUser(user, done) {
  done(null,user);
}

// decides what to unwrap
// intercept each request and authenticate
function deserializeUser(user, done) {
  userModel
    .findUserById(user._id)
    .then(
      function (user) {
        done(null, user);
      }
    )
    .catch(function (err) {
      done(err, null);
    })
}

// Local strategy is to simply check username and password
// uses database's function to check for user name and password, which is essentially authentication
function localStrategy(username, password, done) {
  console.log("inside localStrategy: ", username, password);
  // get the password from the db asscoiated with the username
  // then compare the decrypted password with the plaintext password
  userModel
    .findUserByUsername(username)
    .then(function (user) {
      console.log("We passed the findUserByUsername call: ", user);
      if (user) {
        if (user && bcrypt.compareSync(password, user.password)) {
          done(null, user); //goes to login()
        } else {
          done(null, false);
        }
      }
      else {
        done(null, false); //abort the http request; does not hit login()
      }

    })
    .catch(function (err) {
      console.log("Invalid password ", err)
    });
}

// // TODO: validate on unique emailParts for username
// function googleStrategy(token, refreshToken, profile, done) {
//   userModel
//     .findUserByGoogleId(profile.id)
//     .then(
//       function(user) {
//         if(user) {
//           return done(null, user); // create a new cookie with user info
//         } else {
//           var email = profile.emails[0].value;
//           var emailParts = email.split("@");
//           var newGoogleUser = {
//             username:  emailParts[0],
//             firstName: profile.name.givenName,
//             lastName:  profile.name.familyName,
//             email:     email,
//             google: {
//               id:    profile.id,
//               token: token
//             }
//           };
//           return userModel.createUser(newGoogleUser);
//         }
//       },
//       function(err) {
//         if (err) { return done(err); }
//       }
//     )
//     .then(
//       function(user){
//         return done(null, user);
//       },
//       function(err){
//         if (err) { return done(err); }
//       }
//     );
// }

// function facebookStrategy(token, refreshToken, profile, done) {
//   userModel
//     .findUserByFacebookId(profile.id)
//     .then(
//       function (user) {
//         if (user) {
//           return done(null, user);
//         } else {
//           var email = profile.emails[0].value;
//           var emailParts = email.split("@");
//           var newFacebookUser = {
//             username: emailParts[0] + '_facebook',
//             firstName: profile.name.givenName,
//             lastName: profile.name.familyName,
//             email: email,
//             facebook: {
//               id: profile.id,
//               token: token
//             }
//           };
//           return userModel.createUser(newFacebookUser);
//         }
//       },
//       function (err) {
//         if (err) {
//           return done(err);
//         }
//       }
//     )
//     .then(
//       function (user) {
//         return done(null, user);
//       },
//       function (err) {
//         if (err) {
//           return done(err);
//         }
//       }
//     );
// }