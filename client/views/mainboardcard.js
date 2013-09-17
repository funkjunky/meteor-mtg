Template.mainboardcard.events = {
	"click .addToMain": function(event) {
		if(!currentDeck.unlimitedPool) return; //not allowed yet
		var $this = event.srcElement;
		var cardindex = $($this).parent().data('id');
		currentDeck.mainboard.push(currentDeck.mainboard[cardindex]);
		Decks.update(currentDeck._id, currentDeck);
	},
	"click .moveToSide": function(event) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().data('id');
		console.log(cardindex);
		console.log(currentDeck);
		currentDeck.sideboard.push(currentDeck.mainboard[cardindex]);
		currentDeck.mainboard.splice(cardindex, 1);	//remove from mainboard
		Decks.update(currentDeck._id, currentDeck);
	},
	"click .removeFromMain": function(event) {
		var $this = event.srcElement;
		var cardindex = $($this).parent().data('id');
		currentDeck.pool.push(currentDeck.mainboard[cardindex]);
		currentDeck.mainboard.splice(cardindex, 1);	//remove from mainboard
		Decks.update(currentDeck._id, currentDeck);
	},
};
