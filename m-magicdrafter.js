Decks = new Meteor.Collection("Decks");

if (Meteor.isClient) {
	currentDeck = 0;
	_id = 0;
	_nameToIndex = {};

	Meteor.autorun(function() {
		var a = Meteor.subscribe("Decks", "firstdeck");
		if(a.ready())
		{
			//This is the main object we update. It's the deck we are constructing.
			currentDeck = Decks.findOne({name: "firstdeck"});
			//_id is used to update the mongoDB
			_id = currentDeck._id;
			//This is a map, so we can get the pool's array index from a card name.
			//Necessary when turning getting cards using the text board from the pool.
			for(var i=0; i!=currentDeck.pool.length; ++i)
				_nameToIndex[currentDeck.pool[i].name] = i;
		}
	});

	stacked_click = function(event) {
		var $this = event.srcElement;
		if($($this).prop('checked'))
		{
			for(var i = 0; i != currentDeck.mainboard.length; ++i)
				stackcard(currentDeck.mainboard[i], "#visualMainBoard");
			for(var i = 0; i != currentDeck.sideboard.length; ++i)
				stackcard(currentDeck.sideboard[i], "#visualSideBoard");
		} else {
			$(".cardchoice").show();
			$(".instanceCount").text("");
		}
	};
	Template.thewholepage.events = {
		"click #stacked": stacked_click,
	};


	Template.visualpool.deck = function() {
		return Decks.findOne({name: "firstdeck"});
	};

	stackcard = function(card, boardSelector) {
		var instances = $(boardSelector).find("."+card.id);
		instances.each(function(i, el) {
			if(i == 0)
				$(this).show();
			else
				$(this).hide();
		});
		//show the total # of cards at the top.
		$(instances.get(0)).find(".instanceCount").text(instances.length + " Total");
	};
}

if (Meteor.isServer) {
  Meteor.startup(function () {
	  Meteor.publish("Decks", function(name) {
		  return Decks.find({name: name});
	  });
	  //**uncomment if you need to flush the Decks collection//
	  //Decks.remove({}); console.log("FLUSHED DECKS COLLECTION");
	  //**//
    // code to run on server at startup
	if(Decks.find({name: "firstdeck"}).count() <= 0)
	{
		//lets create the pool for the first deck, using the JSON file.
		var m14 = EJSON.parse(Assets.getText('magicsets/M14.json'));

		Decks.insert({
			name: "firstdeck",
			mainboard: [],
			sideboard: [],
			pool: m14,
		});
	}
  });
}

