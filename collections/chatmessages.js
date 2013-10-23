ChatMessages = new Meteor.Collection("ChatMessages");
if (Meteor.isServer) {
  Meteor.startup(function () {
	  Meteor.publish("LatestChatMessages", function() {
		  var minutes = 60;
		  var maxMessages = 800;

			return ChatMessages.find({timestamp: {$gt: Date.now() - (minutes * 60 * 1000)}});
	  });
  });
}
