var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true})
var xml = require('xml');
var o2x = require('object-to-xml');
app.use(express.static('public'));
var session = require('express-session');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var users = {ChengZan : {fullname : "ChengZan", login: "what", admin: true},
ChengZan2 : {fullname : "ChengZan2", login: "what2", admin: true}}
var os = require("os");
os.hostname();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'thisisourkey',
  database : 'users'
});
connection.connect(function(err){
  if (err) throw err;
  console.log("Connected!");
  
});


app.use(session({
      
      secret : "secret",
      resave : true,
      saveUninitialized : true,
      
      //secret : "secret"

}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', function(req, res) {
  res.sendFile(__dirname+"/" + "client_data.html");


});
app.get('/getId', function(req, res) {
  res.send({"code" : 200, "res": `${req.sessionID}`});

  
});
app.get('/list', function(req, res) {
        console.log("se");
        res.sendFile(__dirname+"/" + "list.html");
        
});
app.get('/goslow', function(req, res) {
        console.log("slow");
        res.sendFile(__dirname+"/" + "goslow.html");
        
});
app.get('/random', function(req, res) {
        console.log("random");
        res.sendFile(__dirname+"/" + "random.html");
        
});
app.get('/error', function(req, res) {
        console.log("error happens");
        res.sendFile(__dirname+"/" + "Errors.html");
        
});
app.get('/interactive', function(req, res) {
        console.log("interactive");
        res.sendFile(__dirname+"/" + "interactive.html");
        
});
app.listen(8084, '104.248.70.89', function() {
});

