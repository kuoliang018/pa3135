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
connection.connect();
var sessionid_track = '';
//app.use(express.static(path.join(__dirname, 'static')));
var randomColor = function() {
 console.log("asd");
		var random = Math.random();
		if(random < 0.33){
			output.innerHTML = "Hello Web World from Language Javascript on "+Date()+ " enjoy my blue page!";
			document.body.style.backgroundColor = "blue";
		}
		else if(random <0.66){
			output.innerHTML = "Hello Web World from Language Javascript on "+Date()+ " enjoy my YELLOW page!";
			document.body.style.backgroundColor = "yellow";
		}
		else if(random < 1.0){
			output.innerHTML = "Hello Web World from Language Javascript on "+Date()+ " enjoy my white page!";
			document.body.style.backgroundColor = "white";
		}

		setTimeout(randomColor, 1000);
	}
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
        req.session.isLogin = false;
        if(req.session.isLogin == false)
          res.sendFile(__dirname+"/" + "login.html");
        else
          res.sendFile(__dirname+"/" + "login.html");
});
app.get('/logout', function(req, res) {
        req.session.isLogin = false;
        req.session.destroy();
        
        res.send({"code": 200, "success": "logout successfull"});
});
app.get('/table', function(req, res){
        
        
        connection.query("SELECT * FROM client_data", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.send({"code": 200, "result": result});
        });
        
});
app.get('/table_error', function(req, res){
        
        
        connection.query("SELECT * FROM error_table", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.send({"code": 200, "result": result});
        });
        
});
app.post('/auth', function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        
        connection.query( 'SELECT * FROM users WHERE username = ?', [username] , function (error, results, fields){
          if(error){
            res.send({"code": 400, "failed" : "error occured"});
          }else{
            console.log(results.length);
            console.log(results[0]);
            
            if(results.length > 0){
              if(results[0].password == password && results[0].username == username){
                req.session.username = username;
                req.session.password = password;
                req.session.isLogin = true;
                /*let html = `
                <!DOCTYPE html>
                <html>
                  <head>
                    <title>CSE 135</title>
                  </head>
                  <body>        
                    <a href = "./report.html"></a>
                   
                  </body>
                </html>
                `;
                res.send(html);*/
                res.send({"code": 200, "success": "login successfull"});
              }else{
                req.session.isLogin = false;
                
                res.send({"code":204, "sucess": "username or password doesn't match"});
              }
            }else{
              req.session.isLogin = false;
              res.send({"code":204, "sucess": "wrong username"});
            }
          }
        });
        
});
app.post('/collect', function(req, res){
        console.log("outside in");
        var resolution = req.body.resolution;
        var browserVersion = req.body.browserVersion;
        var browserVersion_useragent = req.body.browserVersion_useragent;
        var browsertype = req.body.browsertype;
        var loadtime = req.body.loadtime;
        //var jsError = req.body.jsError;
        var sessionid = req.body.sessionid;
        /*var sql = "DROP TABLE client_data";
        if(!(sessionid_track === sessionid) )
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
  var sql = "CREATE TABLE client_data (resolution VARCHAR(255), browserVersion VARCHAR(255), browserVersion_useragent VARCHAR(255), browsertype VARCHAR(255), loadtime VARCHAR(255), sessionid VARCHAR(255))";
  connection.query(sql, function (err, result) {
  if (err) throw err;
      console.log("Table created");
  }); */       
        var sql = "INSERT INTO client_data (resolution, browserVersion, browserVersion_useragent, browsertype, loadtime, sessionid) VALUES ('"+resolution+"', '"+browserVersion+"', '"+browserVersion_useragent+"', '"+browsertype+"', '"+loadtime+"', '"+sessionid+"')";                
        console.log(sql);       
        if(!(sessionid_track === sessionid) ){          
          connection.query(sql.toString(), function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            res.send({"code": 200, "success": "data successfull"});    
          });
          sessionid_track = sessionid;
        }else{
          var sql2 = `UPDATE client_data
           SET resolution = ?,
           browserVersion = ?,
           browserVersion_useragent = ?,
           browsertype = ?,
           loadtime = ?
           WHERE sessionid = ?`;
 
          let data = [resolution, browserVersion, browserVersion_useragent, browsertype, loadtime, sessionid];
 
          // execute the UPDATE statement
          connection.query(sql2, data, (error, results, fields) => {
            if (error){
              return console.error(error.message);
            }
            console.log('Rows affected:', results.affectedRows);
          });
        }
        
});
app.post('/collect_error', function(req, res){
        console.log("collecting error");

        var jsError = req.body.jsError;
        var sessionid = req.body.sessionid;
        //var sql = `INSERT INTO client_data (resolution, browserVersion, browserVersion_useragent, browsertype, loadtime, jsError) VALUES (${resolution}, ${browserVersion}, ${browserVersion_useragent}, ${browsertype}, ${loadtime}, ${jsError})`;
        /*var sql = "DROP TABLE error_table";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("ERRORTABLE deleted");
        });
        var sql = "CREATE TABLE error_table (errors VARCHAR(255), sessionid VARCHAR(255))";
        connection.query(sql, function (err, result) {
        if (err) throw err;
          console.log("ERRORTABLE created");
        });        */
        var sql = "INSERT INTO error_table (errors, sessionid) VALUES ('"+jsError+"', '"+sessionid+"')";                
        console.log(sql);  
        if(!(sessionid_track === sessionid) ){               
          connection.query(sql.toString(), function (err, result) {
          if (err) throw err;
          console.log("1error record inserted");
          res.send({"code": 200, "success": "data successfull"});    
        });
        }else{
           var sql2 = `UPDATE error_table
           SET errors = ?         
           WHERE sessionid = ?`;
 
          let data = [jsError, sessionid];
 
          // execute the UPDATE statement
          connection.query(sql2, data, (error, results, fields) => {
            if (error){
              return console.error(error.message);
            }
            console.log('Rows affected:', results.affectedRows);
          });
        }
});
app.listen(8083, '104.248.70.89', function() {
});

