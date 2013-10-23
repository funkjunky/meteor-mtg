Drafts = new Meteor.Collection("Drafts");
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
  });
}
