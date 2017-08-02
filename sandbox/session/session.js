var app = require('../../express');

app.get('/api/session/:name/:value', function (req, res) {
  var name = req.params.name;
  var value = req.params.value;
  req.session[name] = {name: value}; // storing a json object for key's value
  console.log(req.session);
  res.send(req.session);
})