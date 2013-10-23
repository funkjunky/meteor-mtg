Template.poolcard.events({
	//addToMain
	"click .addToMain": toMainboard,
	"click .cardimage": toMainboard,
	//addToSide
	"click .addToSide": function(event, context) {
		var $this = event.target || event.srcElement;
		var cardindex = $($this).parent().parent().data('id');
		currentDeck.sideboard.push(currentDeck.pool[cardindex]);
		if(!currentDeck.unlimitedPool)
			currentDeck.pool.splice(cardindex, 1);
		Decks.update(currentDeck._id, currentDeck);
	},
	"click .removeFromPool": function(event, context) {
		var $this = event.target || event.srcElement;
		var cardindex = $($this).parent().parent().data('id');
		currentDeck.pool.splice(cardindex, 1);
		Decks.update(currentDeck._id, currentDeck);
	},
});

function toMainboard(event, context) {
		var $this = event.target || event.srcElement;
		var cardindex = $($this).parent().parent().data('id');
		if(!currentDeck.pool[cardindex])
			return;
		currentDeck.mainboard.push(currentDeck.pool[cardindex]);
		Meteor.call("deckLog", _deckname, currentDeck.pool[cardindex].name, "pool", "main");
		if(!currentDeck.unlimitedPool)
			currentDeck.pool.splice(cardindex, 1);
		Decks.update(currentDeck._id, currentDeck);
	}
