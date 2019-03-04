
(function(){
  var list = $('list');
  var err_list = $('error_list');
  var loginForm = $('login-form');
  var logoutBTN = $('logout-btn');
  function init() {
    // Register event listeners
    $('login-btn').addEventListener('click', login);
		logoutBTN,addEventListener('click', logout);
    hideElement(list);
    hideElement(error_list);    
    hideElement(logoutBTN);
  }
  function showLoginError() {
		$('login-error').innerHTML = 'Invalid username or password';
	}

	function clearLoginError() {
		$('login-error').innerHTML = '';
	}
 function showlist(){
   var url = '/table';
		ajax('GET', url, {},
		// successful callback
		function(res) {
			var result = JSON.parse(res);

			// successfully logged in
			if (result.code === 200) {
        console.log(result.code === 200);  
        console.log(result.result);  
        var msg = "<table border=1 width=100%><caption>data dumps here</caption><tr><th>screen resolution: </th><th>browserversion</th><th>browserversion of useragent</th><th>browser type</th><th>load time</th><th>ids represent users:</th></tr>";
        for(var row in result.result){
          msg += `<tr><th>${result.result[row].resolution}</th><th>${result.result[row].browserVersion}</th><th>${result.result[row].browserVersion_useragent}</th><th>${result.result[row].browsertype}</th><th>${result.result[row].loadtime}</th><th>${result.result[row].sessionid}</th></tr>`;
        }
        msg += '</table>';
        list.innerHTML = msg;                
				
			}
		},

		// error
		function() {
			showLoginError();
		});
   var url = '/table_error';
		ajax('GET', url, {},
		// successful callback
		function(res) {
			var result = JSON.parse(res);

			// successfully logged in
			if (result.code === 200) {
        console.log(result.code === 200);  
        console.log(result.result);  
        var msg = "<table border=1 width=100%><caption>data dumps here</caption><tr><th>error: </th><th>ids represent users:</th></tr>";
        for(var row in result.result){
          msg += `<tr><th>${JSON.stringify(result.result[row].errors)}</th><th>${result.result[row].sessionid}</th></tr>`;
        }
        msg += '</table>';
        err_list.innerHTML = msg;                
				
			}
		},

		// error
		function() {
			showLoginError();
		});
 }
 showlist();
 function logout(){
 
   showElement(loginForm);
   hideElement(logoutBTN);
   hideElement(list);
   hideElement(error_list);   
   ajax('GET', '/logout', {},
	    // successful callback
		      function(res) {
			    var result = JSON.parse(res);

			    // successfully logged in
			    if (result.code === 200) {
            console.log(result.code === 200);      
			    
		  	  }
	    	},
		    function() {});
 }
 function genError() {
		throw new Error("this is a customized error, peace");
	}

     /**
     * AJAX helper
     * 
     * @param method -
     *            GET|POST|PUT|DELETE
     * @param url -
     *            API end point
     * @param callback -
     *            This the successful callback
     * @param errorHandler -
     *            This is the failed callback
     */
    function ajax(method, url, data, callback, errorHandler) {
        var xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        xhr.onload = function() {
			    if (xhr.status === 200) {
				    callback(xhr.responseText);
			    } else if (xhr.status === 403) {
				    onSessionInvalid();
			    } else {
				    errorHandler();
		  	  }
	    	};


        xhr.onerror = function() {
            console.error("The request couldn't be completed.");
            errorHandler();
        };

        if (data === null) {
            xhr.send();
        } else {
            xhr.setRequestHeader("Content-Type",
                "application/json;charset=utf-8");
            xhr.send(data);
        }
    }

  function login() {
		var username = $('username').value;
		var password = $('password').value;
    var url = '/auth';
		var req = JSON.stringify({
			username : username,
			password : password,
		});

		ajax('POST', url, req,
		// successful callback
		function(res) {
			var result = JSON.parse(res);

			// successfully logged in
			if (result.code === 200) {
        console.log(result.code === 200);      
				showElement(list);
        hideElement(loginForm);
        showElement(logoutBTN);
        showElement(error_list);   
			}
		},

		// error
		function() {
			showLoginError();
		});

	}


  function $(tag, options) {
        if (!options) {
            return document.getElementById(tag);
        }

        var element = document.createElement(tag);

        for (var option in options) {
            if (options.hasOwnProperty(option)) {
                element[option] = options[option];
            }
        }

        return element;
    }

    function hideElement(element) {
        element.style.display = 'none';
    }

    function showElement(element, style) {
        var displayStyle = style ? style : 'block';
        element.style.display = displayStyle;
    }
    init();
})();
