(function(){
	
	var bgc = document.getElementById('bgc');
  $('submit_btn').addEventListener('click', collect);
  //console.log("collectiong");
	
  function collect(){
    console.log("collectiong");
    var firstname = $('firstname').value;
    var lastname = $('lastname').value;
    var choose_method = $('choose_method');
    var choose_color = $('choose_color');
    var method = choose_method.options[choose_method.selectedIndex].value;
    console.log(method);
    var color = choose_color.options[choose_color.selectedIndex].value;
    console.log(color);
    if(method == "get")
      $('echo').method = "get";
    else if(method == "post")
      $('echo').method = "post";
    if(color == "blue")
      document.body.style.backgroundColor = "blue";
    if(color == "red")
      document.body.style.backgroundColor = "red";
    var url = 'http://104.248.70.89:8083/echo';
    
    
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
	

})();
