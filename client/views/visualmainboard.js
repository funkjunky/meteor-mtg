	Template.visualmainboard.deck = _deck;
	Template.visualmainboard.rendered = function() {
		if(currentDeck)
			stacked_click({srcElement: $("#stacked").get(0)});
	};
