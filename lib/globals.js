//THIS SHOULD NOT BE IN THE LIB FOLDER... OH GAWD waht a mess
Sets = new Meteor.Collection("Sets");
Pools = new Meteor.Collection("Pools");
Decks = new Meteor.Collection("Decks");
Drafts = new Meteor.Collection("Drafts");
Packs = new Meteor.Collection("Packs");
Logs = new Meteor.Collection("Logs");
Feedbacks = new Meteor.Collection("Feedbacks");
ChatMessages = new Meteor.Collection("ChatMessages");

if (Meteor.isClient) {
	currentDeck = 0;
	_id = 0;
	_nameToIndex = {};
}
