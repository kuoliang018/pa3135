(function(){
 var startT = performance.now();
    function init(){
      var startT = performance.now();
      var m = Math.random();
      var i = 0;
      while(i<m*10000000000){
        i++;
      }
      getId();
      getError();
    }
    var star = performance.now();
    var errorMessage = '';
    function collect(id){
      
      var msg = '';
      /*window.onerror = function (msg, url, lineNo, columnNo, error) {
        var string = msg.toLowerCase();
        var substring = "script error";
        if (string.indexOf(substring) > -1){
          alert('Script Error: See Browser Console for Detail');
        } else {
        var message = [
          'Message: ' + msg,
          'URL: ' + url,
          'Line: ' + lineNo,
          'Column: ' + columnNo,
          'Error object: ' + JSON.stringify(error)
        ].join(' - ');
        console.log("message is "+message);
        msg = message;
        }
      };*/
      console.log("id is " + id);
      var info = {
        resolution : screen.availWidth.toString() + ' * ' + screen.availHeight.toString(),
        browserVersion : navigator.appVersion,
        browserVersion_useragent : navigator.userAgent,
        browsertype : navigator.platform,
        loadtime : performance.now()-startT,//window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart,
        //jsError : msg,
        sessionid : id,
      };
      var url = 'http://104.248.70.89:8083/collect';
      var req = JSON.stringify(info);
      ajax('POST', url, req,
		    // successful callback
		    function(res) {
			  var result = JSON.parse(res);

			  // successfully logged in
  			if (result.code === 200) {
          console.log(result);      
				
			  }
		  },

		  // error
		  function() {
			  console.log('error');      
		  });
      
    }
    //collect();
    function getId() {
      var sessionid = '';
    
      assign(function(sessionid){console.log(sessionid);collect(sessionid);});
		  console.log("id is no"+sessionid);
      return sessionid;
    }
    //getId();
    function assign(callback) {
      var url = '/getId';
      var req = JSON.stringify({
			
	    });
     ajax('GET', url, req,
	    // successful callback
		      function(res) {
			    var result = JSON.parse(res);

			    // successfully logged in
			    if (result.code === 200) {
            console.log(result.code === 200);      
			    	callback(result.res);
		  	  }
	    	},
		    function() {});
    }
    function getError() {
      var sessionid = '';
    
      assign(function(sessionid){console.log(sessionid);collect_error(sessionid);});
      return sessionid;
    }
    //getError();
  function collect_error(id){
    window.onerror = function (msg, url, lineNo, columnNo, error) {
        var string = msg.toLowerCase();
        var substring = "script error";
        if (string.indexOf(substring) > -1){
          alert('Script Error: See Browser Console for Detail');
        } else {
        var message = [
          'Message: ' + msg,
          'URL: ' + url,
          'Line: ' + lineNo,
          'Column: ' + columnNo,
          'Error object: ' + JSON.stringify(error)
        ].join(' - ');
        console.log("message is "+message);
        if(message != errorMessage){
          var info = {
            jsError : message,
            sessionid : id,
          };
          var url = 'http://104.248.70.89:8083/collect_error';
          var req = JSON.stringify(info);
          ajax('POST', url, req,
		      // successful callback
		        function(res) {
			        var result = JSON.parse(res);
  			      if (result.code === 200) {
                console.log(result);
			        }
		        },
		        function() {
			        console.log('error');      
		        }
          );
          message = errorMessage;
        } 
      }
    };
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
  init();
    
})();
