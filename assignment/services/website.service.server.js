const app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

var websites = [{ "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
  { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
  { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
  { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
  { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
  { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
  { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }];

// Server listeners on specific URL's
app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

// Implementations of event handlers
function createWebsite(req, res) {
  var website = req.body;
  var userId = req.params['userId'];
  websiteModel
    .createWebsiteForUser(userId, website)
    .then(
      function(err, website) {
        if (err) {
          res.send(err);
        }
        if (website) {
          res.json(website);
        } else {
          res.sendStatus(400).send("Bad input. Website not created.");
        }
      }
    );
}

function findAllWebsitesForUser(req, res) {
  var userId = req.params.userId;
  websiteModel
    .findAllWebsitesForUser(userId)
    .then(
      function(err, websites) {
        if (err) {
          res.send(err);
        }
        if (websites) {
          res.json(websites);
        } else {
          res.sendStatus(400).send("Bad input. Websites not found.");
        }
      }
    );
}

function findWebsiteById(req, res) {
  var websiteId = req.params.websiteId;
  websiteModel
    .findWebsiteById(websiteId)
    .then(
      function(err, website) {
        if (err) {
          res.send(err);
        }
        if (website) {
          res.json(website);
        } else {
          res.sendStatus(400).send("Bad input. Website not found.");
        }
      }
    );
  // for (key in websites) {
  //   var websiteActual = websites[key];
  //   if (parseInt(websiteActual._id) === parseInt(req.params.websiteId)) {
  //     return res.json(websiteActual);
  //   }
  // }
  // return res.sendStatus(404);
}

function updateWebsite(req, res) {
  var website = req.body;
  var websiteId = req.params.websiteId;
  websiteModel
    .updateWebsite(websiteId, website)
    .then(
      function(err, website) {
        if (err) {
          res.send(err);
        }
        if (website) {
          res.json(website);
        } else {
          res.sendStatus(400).send("Bad input. Website not updated.");
        }
      }
    );

  // for (key in websites) {
  //   var websiteActual = websites[key];
  //   if (parseInt(websiteActual._id) === parseInt(req.params.websiteId)) {
  //     websites[key] = website;
  //     return res.sendStatus(200);
  //   }
  // }
  // return res.sendStatus(404);
}

function deleteWebsite(req, res) {
  for (key in websites) {
    var websiteActual = websites[key];
    if(parseInt(websiteActual._id) === parseInt(req.params.websiteId)) {
      websites.splice(key,1);
      return res.sendStatus(200);
    }
  }
  return res.sendStatus(404);
}
