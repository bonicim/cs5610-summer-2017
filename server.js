//using express with node js
var express = require('express');

////initialize app as an express application
var app = express();

//Server variables
var ipaddress = '127.0.0.1'; // this is localhost
var port      = 3000;

//calling some app methods
app.use(express.static(__dirname+'/public'));
app.listen(port, ipaddress);

//do something
console.log("hello world!");
