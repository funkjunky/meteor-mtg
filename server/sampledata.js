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

		//create a deck to manipulate
		Decks.insert({
			name: "firstdeck",
			mainboard: [],
			sideboard: [],
			pool: m14,
			unlimitedPool: true,
		});
	}

		//create a deck based on opening a single pack.
		Decks.remove({name: "pack0"});
		var pack = getpack("M14");

		Decks.insert({
			name: "pack0",
			mainboard: [],
			sideboard: [],
			pool: pack,
			testpack: true,
		});

		//create a pool based on a sealed pool of m14
		Decks.remove({name: "pool0"});
		var pool = getpool(["M14", "M14", "M14", "M14", "M14", "M14",]);

		Decks.insert({
			name: "pool0",
			mainboard: [],
			sideboard: [],
			pool: pool,
			testpool: true,
		});


		//start a draft
		if(Drafts.find().count() <= 0)
		{
			Drafts.insert({
				id: 555,
				status: "inprogress",
				players: [
					"jason",
					"computer",
					"computer",
					"computer",
				],
				packs: [
					"M14",
					"M14",
					"M14",
				],
				openpack: 0,
			});
			Packs.insert({
				draftid: 555,
				owner: "jason",
				seat: 0,
				cards: getpack("M14"),
				pick: 0,
			});
			Packs.insert({
				draftid: 555,
				owner: "computer",
				seat: 1,
				cards: getpack("M14"),
				pick: 0,
			});
			Packs.insert({
				draftid: 555,
				owner: "computer",
				seat: 2,
				cards: getpack("M14"),
				pick: 0,
			});
			Packs.insert({
				draftid: 555,
				owner: "computer",
				seat: 3,
				cards: getpack("M14"),
				pick: 0,
			});

			Decks.insert({
				name: "draft0",
				owner: "jason",
				seat: 0,
				mainboard: [],
				sideboard: [],
				pool: [],
				draft: true,
				draftid: 555,
				draftinprogress: true,
			});

			Decks.insert({
				name: "draftc1",
				owner: "computer",
				seat: 1,
				mainboard: [],
				sideboard: [],
				pool: [],
				draft: true,
				draftid: 555,
				draftinprogress: true,
			});

			Decks.insert({
				name: "draftc2",
				owner: "computer",
				seat: 2,
				mainboard: [],
				sideboard: [],
				pool: [],
				draft: true,
				draftid: 555,
				draftinprogress: true,
			});
	
			Decks.insert({
				name: "draftc3",
				owner: "computer",
				seat: 3,
				mainboard: [],
				sideboard: [],
				pool: [],
				draft: true,
				draftid: 555,
				draftinprogress: true,
			});
		}
});
