	currentPack = {};
	Meteor.autorun(function() {
		var a = Meteor.subscribe("Decks", "draftc3");
		var b = Meteor.subscribe("Packs", 555, 0);
		var c = Meteor.subscribe("Drafts", 555);
		if(a.ready() && b.ready() && c.ready())
		{
			//This is the main object we update. It's the deck we are constructing.
			currentDeck = Decks.findOne({name: "draftc3"});
			currentPack = Packs.findOne({draftid: 555, seat: 0}, {sort: {pick: 1}});
			//_id is used to update the mongoDB
			//TODO: this is dumb, just use currentDeck._id everywhere >>;;
			_id = currentDeck._id;
		}
	});

	Template.currentdraftdeck.deck = _deck;
	Template.currentdraftpick.pack = function() {
		return Packs.findOne({draftid: 555, seat: 0}, {sort: {pick: 1}});
	};
	Template.drafter.draft = function() {
		return Drafts.findOne({id: 555});
	};
