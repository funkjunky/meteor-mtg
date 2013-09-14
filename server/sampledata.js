Meteor.startup(function () {
	//turn to true to erase everything
	if(false)
	{
		Sets.remove({});
		Pools.remove({});
		Decks.remove({});
		console.log("FLUSHED ALL COLLECTION");
	}
	
	// code to run on server at startup
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

		Decks.insert({
			name: "firstdeck",
			mainboard: [],
			sideboard: [],
			pool: m14,
			unlimitedPool: true,
		});
	}

		Decks.remove({name: "pack0"});
		var pack = getpack("M14");

		Decks.insert({
			name: "pack0",
			mainboard: [],
			sideboard: [],
			pool: pack,
			testpack: true,
		});

		Decks.remove({name: "pool0"});
		var pool = getpool(["M14", "M14", "M14", "M14", "M14", "M14",]);

		Decks.insert({
			name: "pool0",
			mainboard: [],
			sideboard: [],
			pool: pool,
			testpool: true,
		});


});
