Handlebars.registerHelper('time', function(timestamp) {
	var date = new Date(timestamp);
	return date.toLocaleTimeString();
});
