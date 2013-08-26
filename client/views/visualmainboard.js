	Template.visualmainboard.deck = function() {
		return Decks.findOne({name: "firstdeck"});
	};
	Template.visualmainboard.rendered = function() {
		if(currentDeck)
			stacked_click({srcElement: $("#stacked").get(0)});
	};
