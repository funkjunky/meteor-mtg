Template.mainboardcard.events = {
	"click .addToMain": function(event) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().data('id');
		currentDeck.mainboard.push(currentDeck.mainboard[cardindex]);
		Decks.update(_id, currentDeck);
	},
	"click .moveToSide": function(event) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().data('id');
		currentDeck.sideboard.push(currentDeck.mainboard[cardindex]);
		currentDeck.mainboard.splice(cardindex, 1);	//remove from mainboard
		Decks.update(_id, currentDeck);
	},
	"click .removeFromMain": function(event) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().data('id');
		currentDeck.mainboard.splice(cardindex, 1);	//remove from mainboard
		Decks.update(_id, currentDeck);
	},
};
