Logs = new Meteor.Collection("Logs");
if (Meteor.isServer) {
  Meteor.startup(function () {
	  Meteor.publish("AllLogs", function() {
		  return Logs.find({}, {sort: {timestamp: -1}});
	  });
  });
}
