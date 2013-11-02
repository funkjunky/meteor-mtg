//TODO: If this works, then fix each_w_index... because it currently mutates the object... whne it shouldnt!
Handlebars.registerHelper('each_w_index', function(context, options) {
	if(!context)
		return;

	var ret = "";
	for(var i = 0; i != context.length; ++i)
	{
		context[i]._index = i;
		ret += options.fn(context[i]);
	}

	return ret;
});
