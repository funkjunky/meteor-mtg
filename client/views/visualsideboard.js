	Template.visualsideboard.deck = function() {
		return Decks.findOne({name: "firstdeck"});
	};
	Template.visualsideboard.rendered = function() {
		if(currentDeck)
			stacked_click({srcElement: $("#stacked").get(0)});
	};
