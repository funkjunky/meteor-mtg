Sets = new Meteor.Collection("Sets");
if (Meteor.isServer) {
  Meteor.startup(function () {
	  Meteor.publish("SetNames", function() {
		  return Sets.find({}, {fields: {name:1}, sort: {release: -1}});
	  });
	  Meteor.publish("Sets", function(name) {
		  return Sets.find({name: name});
	  });
  });
}
