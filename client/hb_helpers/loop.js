Handlebars.registerHelper('loop', function(times, options) {
	var str = "";

	for(var i=0; i!=times; ++i)
		str += options.fn(this);

	return str;
});
