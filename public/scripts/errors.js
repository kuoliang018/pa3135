
(function(){

  var switchError = false;
  function init() {
    
		$('gen_error'),addEventListener('click', genError);
    
  }

 function genError() {


		    throw new Error("this is a customized error, peace");
     //var t = setTimeout(genError, 1000); 
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
