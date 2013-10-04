Handlebars.registerHelper('time', function(timestamp) {
	var date = new Date(timestamp);
	return date.getHours() + ":" + date.getMinutes();
});
