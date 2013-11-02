Handlebars.registerHelper('count', function(n, options) {
	var str = "";

	for(var i=0; i!=n; ++i)
	{
		data = Handlebars.createFrame(options.data || {});
		data.index = i;

		str += options.fn(this, {data: data});
	}

	return str;
});
