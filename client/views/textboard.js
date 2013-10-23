	//takes an object and duplicates it x times and return the resulting array.
	//the objects aren't cloned, they are simply references of each other.
	var arrayOfDups = function(obj, x) {
		var arr = [];
		for(var i=0; i!=x; ++i)
			arr.push(obj);

		return arr;
	};

	//wrapper, because really, I should be using global variables so much =P
	var nameToIndex = function(name) {
		return _nameToIndex[name];
	};	

	Template.textboard.events({
		"change .textualMainBoard,.textualSideBoard,.textualPool": function(event) {
			var $this = event.target || event.srcElement;
			var newboard = [];

			//parse the text
			var tokens = $($this).val().split("\n");
			var cardregex = /(\d+)x (.+)/;
			var result,card;
			for(var i = 0, result; i != tokens.length; ++i)
				if((result = cardregex.exec(tokens[i]))) {
					if(card = currentDeck.pool[nameToIndex(result[2])])
						newboard = newboard.concat(arrayOfDups(card, result[1]));
					else
						console.log("Card not recognized: " + result[2]);
				}
		
			currentDeck[$($this).data("board")] = newboard;
			Decks.update(currentDeck._id, currentDeck);
		},
	});

