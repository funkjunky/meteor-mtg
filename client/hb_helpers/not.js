Handlebars.registerHelper('not', function(condition, options) {
	return (!condition) ? options.fn(this) : "" ;
});
