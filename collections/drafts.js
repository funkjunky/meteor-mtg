Drafts = new Meteor.Collection("Drafts");
Draftstats = new Meteor.Collection("Draftstats");
if (Meteor.isServer) {
  Meteor.startup(function () {
	  Meteor.publish("Drafts", function(draftid) {
		  return Drafts.find({id: draftid});
	  });
	  Meteor.publish("PlayerDrafts", function(username) {
		  return Drafts.find({players: username}); 
	  });
	  Meteor.publish("OpenDrafts", function() {
		  //TODO: filter out full lobbys.
		  return Drafts.find({status: 'lobby'});
	  });
	  Meteor.publish("Draftstats", function(draftid) {
		  return Draftstats.find({draftid: draftid});
	  });
  });
}
