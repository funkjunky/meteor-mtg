if (Meteor.isServer) {
  Meteor.startup(function () {
	  Meteor.publish("Decks", function(name) {
		  return Decks.find({name: name});
	  });
	  Meteor.publish("Sets", function(name) {
		  return Decks.find({name: name});
	  });
	  Meteor.publish("Packs", function(draftid, seat) {
		  return Packs.find({draftid: draftid, seat: seat});
	  });
  });
}
