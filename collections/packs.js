Packs = new Meteor.Collection("Packs");
if (Meteor.isServer) {
  Meteor.startup(function () {
	  Meteor.publish("Packs", function(draftid, owner) {
		  return Packs.find({draftid: draftid, owner: owner}, {sort: {pick: 1}});
	  });
  });
}
