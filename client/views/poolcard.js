Template.poolcard.events({
	//addToMain
	"click .addToMain": function(event, context) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().data('id');
		currentDeck.mainboard.push(currentDeck.pool[cardindex]);
		console.log(_deckname);
		Meteor.call("deckLog", _deckname, currentDeck.pool[cardindex].name, "pool", "main");
		if(!currentDeck.unlimitedPool)
			currentDeck.pool.splice(cardindex, 1);
		Decks.update(currentDeck._id, currentDeck);
	},
	//addToSide
	"click .addToSide": function(event, context) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().data('id');
		currentDeck.sideboard.push(currentDeck.pool[cardindex]);
		if(!currentDeck.unlimitedPool)
			currentDeck.pool.splice(cardindex, 1);
		Decks.update(currentDeck._id, currentDeck);
	},
	"click .removeFromPool": function(event, context) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().data('id');
		currentDeck.pool.splice(cardindex, 1);
		Decks.update(currentDeck._id, currentDeck);
	},
});
