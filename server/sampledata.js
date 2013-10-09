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
	if(Sets.find({name: "THS"}).count() <= 0)
	{
		//grab the m14 card data
		var ths = EJSON.parse(Assets.getText('magicsets/THS.json'));
		var m14 = EJSON.parse(Assets.getText('magicsets/M14.json'));
		
		//create the m14 set inthe mongodb
		Sets.insert({
			name: "M14",
			release: "2013-06",
			cards: m14,
		});
		
		//create the m14 pool in the mongoDB
		Pools.insert({
			name: "M14",
			cards: m14,
		});

		for(var i=0; i!=ths.length; ++i)
			ths[i].set_code = "THS";

		//create the ths set inthe mongodb
		Sets.insert({
			name: "THS",
			release: "2013-09",
			cards: ths,
		});
		
		//create the m14 pool in the mongoDB
		Pools.insert({
			name: "THS",
			cards: ths,
		});
	}
});
