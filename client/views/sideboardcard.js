Template.sideboardcard.events = {
	"click .addToSide": function(event) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().data('id');
		currentDeck.sideboard.push(currentDeck.sideboard[cardindex]);
		Decks.update(_id, currentDeck);
	},
	"click .moveToMain": function(event) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().data('id');
		currentDeck.mainboard.push(currentDeck.sideboard[cardindex]);
		currentDeck.sideboard.splice(cardindex, 1);	//remove from mainboard
		Decks.update(_id, currentDeck);
	},
	"click .removeFromSide": function(event) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().data('id');
		currentDeck.sideboard.splice(cardindex, 1);	//remove from mainboard
		Decks.update(_id, currentDeck);
	},
};
