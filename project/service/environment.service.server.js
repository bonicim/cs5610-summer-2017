var app = require('../../express');

app.get("/yenv/omdb", getOmdb);

function getOmdb(req, res) {
  console.log("KEY", process.env.OMDB_KEY);
  return res.json(process.env.OMDB_KEY);
}