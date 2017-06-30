const app = require('../../express');

var websites = [{ "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
  { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
  { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
  { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
  { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
  { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
  { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }];

// Server listeners on specific URL's

// POST
app.post('/api/user/:userId/website', createWebsite);

// GET
app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);

// PUT
app.put('/api/website/:websiteId', updateWebsite);

// DELETE
app.delete('/api/website/:websiteId', deleteWebsite);

// Implementations of event handlers

function createWebsite(req, res) {

}

function findAllWebsitesForUser(req, res) {
  var websitesArr= [];
  for (key in websites) {
    var websiteActual = websites[key];
    if (parseInt(websiteActual.developerId) === parseInt(req.params.userId)) {
      websitesArr.push(websiteActual);
    }
  }
  res.json(websitesArr);
}

function findWebsiteById(req, res) {
}

function updateWebsite(req, res) {
  var website = req.body;
  for (key in websites) {
    var websiteActual = websites[key];
    if (parseInt(websiteActual._id) === parseInt(req.params.websiteId)) {
      websites[key] = website;
      return res.sendStatus(200);
    }
  }
  return res.sendStatus(400);
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
