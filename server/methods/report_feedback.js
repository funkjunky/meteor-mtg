Meteor.methods({
	"report_feedback": function(type, body) {
		var user = Meteor.user();
		if(user)
			user = user.username;
		else
			user = null;
console.log("feedback reported");

		Feedbacks.insert({
			id: Date.now(),
			timestamp: Date.now(),
			user: user,
			type: type,
			body: body,
		});
	},
});
