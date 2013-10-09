Template.sideboardcard.events({
	"click .addToSide": function(event) {
		if(!currentDeck.unlimitedPool) return; //not allowed yet
		var $this = event.srcElement;
		var cardindex = $($this).parent().parent().data('id');
		currentDeck.sideboard.push(currentDeck.sideboard[cardindex]);
		Decks.update(currentDeck._id, currentDeck);
	},
	"click .moveToMain": function(event) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().parent().data('id');
		currentDeck.mainboard.push(currentDeck.sideboard[cardindex]);
		currentDeck.sideboard.splice(cardindex, 1);	//remove from mainboard
		Decks.update(currentDeck._id, currentDeck);
	},
	"click .removeFromSide": function(event) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().parent().data('id');
		currentDeck.pool.push(currentDeck.sideboard[cardindex]);
		currentDeck.sideboard.splice(cardindex, 1);	//remove from mainboard
		Decks.update(currentDeck._id, currentDeck);
	},
});
