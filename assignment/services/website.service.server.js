const app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

// Server listeners on specific URL's
app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
// app.delete('/api/website/:websiteId?userId=uid', deleteWebsite);
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
}

function deleteWebsite(req, res) {
  var websiteId = req.params.websiteId;
  var userId = req.query.userId;
  websiteModel
    .deleteWebsite(websiteId, userId)
    .then(function(website) {
        if (website) {
          res.json(website);
        } else {
          res.sendStatus(400).send("Bad input. Website not updated.");
        }
      }
    )
    .catch(function (err, res) {
      handleError(err, res)
    });
}

function handleError(err, res) {
  console.log("Could not execute call to database: ", err);
  res.sendStatus(500).send("Could not execute call to database: ", err);
}
