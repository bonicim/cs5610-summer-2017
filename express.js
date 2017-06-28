// Creating a singleton of express instance
const express = require('express');
const app = express();
app.express = express;
module.exports = app;
