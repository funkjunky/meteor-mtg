Handlebars.registerHelper('timeout_state', function(draft, options) {
	if(draft.quickpick.indexOf(Meteor.user().username) != -1)
		return "red";
	else if(draft.warning.indexOf(Meteor.user().username) != -1)
		return "yellow";
	else
		return "green";
});
