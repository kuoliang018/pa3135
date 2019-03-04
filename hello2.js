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

app.get('/', function(req, res) {
        res.sendFile(__dirname+"/" + "index.html");
});
app.get('/helloworld', function(req, res) {
        let msg = "Hello Web World from Language Javascript on "+Date()+ " enjoy my blue page!";
        var color = '';
        var random = Math.random();
        if(random < 0.33){
          color = 'blue';
          msg = "Hello Web World from Language Javascript on "+Date()+ " enjoy my blue page!";
        }
        else if (random < 0.66){
          color = 'yellow';
          msg = "Hello Web World from Language Javascript on "+Date()+ " enjoy my YELLOW page!";
        }
        else if (random < 1.0){
          color = 'white'; 
          msg = "Hello Web World from Language Javascript on "+Date()+ " enjoy my white page!";
        }
        let html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>CSE 135</title>
          
        </head>
        <body bgcolor = ${color}>        
          <p>${msg}</p>
                
        </body>
        </html>


        `;
        res.send(html);
});
app.get('/index.html', function(req, res) {
        res.sendFile(__dirname+"/" + "index.html");
});
app.get('/sessionpage1', function(req, res) {
        res.sendFile(__dirname+"/" + "sessionpage1.html");
});
app.get('/sessionpage2', function(req, res) {
        //document.body.style.backgroundColor = "red";
        //res.sendFile(__dirname+"/" + "sessionpage2.html");
        console.log("as");
        var html;
        if(req.session.firstname != null && req.session.lastname != null && req.session.firstname != "" && req.session.lastname != ""){
          html = `
                   <!doctype html>
                   <html>\n<head>\n<title>Hello Node!</title>\n</head>
                   <body>\n<h1>Hello ${req.session.firstname} ${req.session.lastname} nice to meet you!</h1>\n
                   <form action="/sessionpage2/clear" method="get">
                    <input type="submit" value="clear session" name="clear" id="clear_btn" />
                    </form><a id = "redirect_btn" href = "http://104.248.70.89:8083/sessionpage1">page1</a>
                   </form>
                   </body>\n</html>
                 `;
        }else{
          html = `
                   <!doctype html>
                   <html>\n<head>\n<title>Hello Node!</title>\n</head>
                   <body>\n<h1>Howdy stranger. Please tell me your name on page1!</h1>\n
                   <form action="/sessionpage2/clear" method="get">
                    <input type="submit" value="clear session" name="clear" id="clear_btn" />
                    </form><a id = "redirect_btn" href = "http://104.248.70.89:8083/sessionpage1">page1</a>
                   </form>
                   </body>\n</html>
                 `;
        }
   res.send(html);
});
app.get('/sessionpage2/clear', function(req, res) {
       console.log(req.session == null);
       req.session.destroy();
       console.log(req.session == null);
});
app.get('/hellodata', function (req, res){
      response = {
                msg : "Hello Data is " + Date()
        };
        console.log(req.query.response);
  console.log(req.query.response == "XML");
	if(req.query.response == "JSON"){
	res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(response));
	}else if(req.query.response == "xml"){
		res.set('Content-Type', 'text/xml');
		res.write('<?xml version="1.0" encoding="utf-8"?>');
		res.end(xml(response));
	}else if(req.query.response == "" || req.query.response == null){
     console.log(req.query.response + "is a");
      //res.sendFile(__dirname+"/" + "index.html");
      res.set('Content-Type', 'text/html');
      res.send( '<h1>Error: Specifyresponse paramter</h1>');
  }
	 		
        res.end();
});
app.get('/environment', (req, res) => {
   let headers = req.headers;
   // not doing any formatting nor looking at the server values
   let html = `
   <!doctype html>
   <html>\n<head>\n<title>Hello Node!</title>\n</head>
   <body>\n<h1>Headers are ${JSON.stringify(headers)}</h1>\n</body>\n</html>
   `;
    res.send(html);
});
app.get('/echo', (req, res) => {
  response = {
      firstname:req.query.firstname,
      lastname:req.query.lastname,
      color:req.query.choose_color,
      method:req.query.choose_method
   };
   console.log(response);
   //res.sendFile(__dirname+"/" + "error404.html");
   let html = `
   <!doctype html>
   <html>\n<head>\n<title>Hello Node!</title>\n</head>
   <body bgcolor=${response.color}>\n<h1>Hello   ${response.firstname}      ${response.lastname}  from a Web app written in Javsscript on   ${Date()}</h1>\n</body>\n</html>
   `;
   res.send(html);
});
app.post('/echo', (req, res) => {
  response = {
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      color:req.body.choose_color,
      method:req.body.choose_method
   };
   console.log(response);
   //res.sendFile(__dirname+"/" + "index.html");
   let html = `
   <!doctype html>
   <html>\n<head>\n<title>Hello Node!</title>\n</head>
   <body bgcolor=${response.color}>\n<h1>Hello ${response.firstname}  ${response.lastname} from a Web app written in Javsscript on  ${Date()}</h1>\n</body>\n</html>
   `;
   
   res.send(html);
   
});

app.get('/sessionpage1/echoname', (req, res) => {
  response = {
      firstname:req.query.firstname,
      lastname:req.query.lastname,
      color:req.query.choose_color,
      method:req.query.choose_method
   };
   req.session.firstname = req.query.firstname;
   req.session.lastname = req.query.lastname;
   console.log(response);
   req.session.save();
   
});
app.post('/sessionpage1/echoname', (req, res) => {
  response = {
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      color:req.body.choose_color,
      method:req.body.choose_method
   };
  req.session.firstname = req.body.firstname;
   req.session.lastname = req.body.lastname;
   console.log(response);
   req.session.save();
});
app.get('/rest', function(req, res) {
        
        let html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>CSE 135</title>
        </head>
        <body>        
          <p>${JSON.stringify(users)}</p>
          <form id = "rest" action="http://104.248.70.89:8083/rest/create" method = "POST">
                <label>username: </label>
                <input id = "fullname" type = "text" name = "fullname"><br>
                <label>login: </label>
                <input id = "login" type = "text" name = "login"><br>                
                <label>admin: </label>
                <input id = "admin" type = "text" name = "admin"><br>                                 
                
                <button id = "submit_btn" type="submit">submit</button>                                                                                
          </form>   
                   
        </body>
        </html>


        `;
        res.send(html);
});
app.post('/rest/create', function(req, res) {
response = {
      fullname:req.body.fullname,
      login:req.body.login,
      admin:req.body.admin,
     
   };
        var user = req.body.fullname;
        var login = req.body.login;
        var admin = req.body.admin;
        console.log(users);
        let msg = `${JSON.stringify(user)} added`;
        if(!users[user]){
          users[user] = {fullname : user, login : login, admin : admin};
        }else{
          msg = "user exists"
        }
        let html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>CSE 135</title>
        </head>
        <body>        
          <p>${msg}</p>
         
        </body>
        </html>


        `;
        console.log(users);                                
        res.send(html);
});
app.get('/rest/read/:fullname', function(req, res) {
        var user = users[req.params.fullname];
        let msg = '';                
        if(!user){
          msg = `${req.params.fullname} doesn't exist`;                
        }else{
          msg = `${JSON.stringify(user)} is saying hello`;                        
        }
        let html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>CSE 135</title>
        </head>
        <body>        
          <p>${msg}</p>
         
        </body>
        </html>


        `;
        res.send(html);                                                        
});
app.put('/rest/update/:fullname', function(req, res) {
        var newUser = req.body.fullname;
        var login = req.body.login;
        var admin = req.body.admin;
        var user = users[req.params.fullname];
        let msg = '';
        if(!user){
          msg = `${req.params.fullname} doesn't exist`;
          res.send(msg);                    
        }else{
          msg = `${JSON.stringify(user)} is changed`; 
          console.log(newUser);                    
          delete users[req.params.fullname];  
          users[newUser] = {fullname : newUser, login : login, admin : admin};
          res.send(JSON.stringify(users));                    
               
        }
       
        res.end();
});
app.delete('/rest/delete/:fullname', function(req, res) {

        var user = users[req.params.fullname];
        let msg = '';
        if(!user){
          msg = `${req.params.fullname} doesn't exist`;
          res.send(msg);                    
        }else{
          msg = `${JSON.stringify(user)} is changed`; 
                             
          delete users[req.params.fullname];  
         
          res.send(JSON.stringify(users));                    
               
        }
       
        res.end();
});
app.listen(8083, '104.248.70.89', function() {
});

