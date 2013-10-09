Template.chatroom.events({
	"submit #sendMessage": function(event) {
		event.preventDefault();
		Meteor.call("postChatMessage", $("#message").val());
		event.srcElement.reset();
	},
});
