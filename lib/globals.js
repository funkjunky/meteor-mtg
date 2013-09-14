//THIS SHOULD NOT BE IN THE LIB FOLDER... OH GAWD waht a mess
Sets = new Meteor.Collection("Sets");
Pools = new Meteor.Collection("Pools");
Decks = new Meteor.Collection("Decks");

if (Meteor.isClient) {
	currentDeck = 0;
	_id = 0;
	_nameToIndex = {};
}
