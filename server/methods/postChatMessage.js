Meteor.methods({
	postChatMessage: function(message) {
		ChatMessages.insert({
			author: Meteor.user().username,
			message: message,
			timestamp: Date.now(),
		});
	},
});
