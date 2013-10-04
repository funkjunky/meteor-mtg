Handlebars.registerHelper('print_r', function(obj) {
	var recurse = function(obj) {
		var str = "<ul>";

		for(var key in obj)
		{
			str += "<li>" + key + ": ";
			if($.isArray(obj[key]) || $.isPlainObject(obj[key]))
			{
				str += recurse(obj[key]);
			} else
				str += obj[key];

			str += "</li>";
		}

		return str + "</ul>";
	}

	return new Handlebars.SafeString(recurse(obj));
});
