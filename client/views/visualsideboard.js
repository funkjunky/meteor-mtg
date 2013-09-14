	Template.visualsideboard.deck = _deck;
	Template.visualsideboard.rendered = function() {
		if(currentDeck)
			stacked_click({srcElement: $("#stacked").get(0)});
	};
