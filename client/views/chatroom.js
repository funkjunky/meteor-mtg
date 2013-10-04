Template.chatroom.events({
	"submit #sendMessage": function(event) {
		console.log('hi');
		event.preventDefault();
		console.log('hi');
		Meteor.call("postChatMessage", $("#message").val());
	},
});
