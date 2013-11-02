Decks = new Meteor.Collection("Decks");
if (Meteor.isServer) {
  Meteor.startup(function () {
	  Meteor.publish("Decks", function(_id) {
		  return Decks.find({_id: _id});
	  });
	  Meteor.publish("RODecks", function(owner, name) {
		  return Decks.find({owner: owner, name: name});
	  });
	  Meteor.publish("DraftDeck", function(owner, draftid) {
		  return Decks.find({owner: owner, draftid: draftid});
	  });
	  Meteor.publish("PlayerDecks", function(username) {
		  return Decks.find({owner: username, draftinprogress: {$ne: true}});
	  });
  });
}
