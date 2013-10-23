Template.chatroom.events({
	"submit #sendMessage": function(event) {
		event.preventDefault();
		Meteor.call("postChatMessage", $("#message").val());
		var $this = event.target || event.srcElement;
		$this.reset();
	},
});
