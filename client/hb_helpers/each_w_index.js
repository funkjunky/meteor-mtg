Handlebars.registerHelper('each_w_index', function(context, options) {
	var ret = "";
	for(var i = 0; i != context.length; ++i)
	{
		context[i]._index = i;
		ret += options.fn(context[i]);
	}

	return ret;
});
