Feedbacks = new Meteor.Collection("Feedbacks");
if (Meteor.isServer) {
  Meteor.startup(function () {
	  Meteor.publish("AllFeedbacks", function() {
		  return Feedbacks.find({}, {sort: {timestamp: -1}});
	  });
  });
}
