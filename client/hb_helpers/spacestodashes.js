Handlebars.registerHelper('spacesToDashes', function(filename) {
	return filename.replace(/[ ']/g, "-");
});
