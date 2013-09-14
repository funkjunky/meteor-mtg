	Meteor.autorun(function() {
		var a = Meteor.subscribe("Decks", "pack0");
		if(a.ready())
		{
			//This is the main object we update. It's the deck we are constructing.
			currentDeck = Decks.findOne({name: "pack0"});
			//_id is used to update the mongoDB
			_id = currentDeck._id;
			//This is a map, so we can get the pool's array index from a card name.
			//Necessary when turning getting cards using the text board from the pool.
			for(var i=0; i!=currentDeck.pool.length; ++i)
				_nameToIndex[currentDeck.pool[i].name] = i;
		}
	});

	Template.builder.events = {
		"click #stacked": stacked_click,
	};

	Template.visualpool.deck = _deck;
