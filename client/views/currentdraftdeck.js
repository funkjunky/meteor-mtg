Template.currentdraftdeck.events({
	"click .cardimage": function(event) {
		var cardindex = $(event.srcElement).parent().parent().data('id');
		var deck = Decks.findOne({draftid: _draftid, seat: $("#wholedraft").data('seat')});
		deck.sideboard = sortcolours(deck.sideboard);

		deck.pool.push(deck.sideboard[cardindex]);
		deck.sideboard.splice(cardindex, 1);
		Decks.update(deck._id, deck);
	},
	"click .poolbutton": function(event) {
		var cardindex = $(event.srcElement).parent().data('id');
		var deck = Decks.findOne({draftid: _draftid, seat: $("#wholedraft").data('seat')});

		deck.sideboard.push(deck.pool[cardindex]);
		deck.pool.splice(cardindex, 1);
		Decks.update(deck._id, deck);

	},
});
