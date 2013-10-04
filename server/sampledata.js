Meteor.startup(function () {
	//turn to true to erase everything
	if(false)
	{
		Sets.remove({});
		Pools.remove({});
		Decks.remove({});
		Drafts.remove({});
		Packs.remove({});
		console.log("FLUSHED ALL COLLECTION");
	}
	
	// import the m14 set if it hasn't been imported yet.
	if(Sets.find({name: "M14"}).count() <= 0)
	{
		//grab the m14 card data
		var m14 = EJSON.parse(Assets.getText('magicsets/M14.json'));
		
		//create the m14 set inthe mongodb
		Sets.insert({
			name: "M14",
			cards: m14,
		});
		
		//create the m14 pool in the mongoDB
		Pools.insert({
			name: "M14",
			cards: m14,
		});

		//TODO: remove this... only once I can make a proper standard, or limited or whatever deck.
		//create a deck to manipulate
		Decks.insert({
			name: "firstdeck",
			mainboard: [],
			sideboard: [],
			pool: m14,
			unlimitedPool: true,
		});
	}
});
