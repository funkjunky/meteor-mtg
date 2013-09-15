Meteor.methods({
	pickcard: function(draftid, owner, seat, cardindex) {
		var packu = Packs.findOne(
				{draftid: draftid, seat: seat},
				{sort: {pick: 1}});
		var decku = Decks.findOne({draftid: draftid, owner: owner, seat: seat});
		var draft = Drafts.findOne({id: draftid});

		var pickdraftcard = function(pack, deck, index)
		{
			var card = pack.cards[index];

			//add the card to the users deck
			deck.pool.push(card);
			//remove the card from the pack
			pack.cards.splice(index, 1);
			//update the pick counter (necessary for order)
			++pack.pick;

			//pass the card to the next seat
			//if openpack is 0 or 2, then pass left, otherwise right
			if(draft.openpack % 2 == 0)
				pack.seat = (pack.seat > 0) ? (pack.seat - 1) : draft.players.length - 1;
			else
				pack.seat = (pack.seat + 1) % draft.players.length;

			//update the owner of the pack appropriately
			pack.owner = draft.players[pack.seat];

			//if the pack is empty, then delete it.
			if(pack.cards.length <= 0)
				Packs.remove(pack._id);
			else
				Packs.update(pack._id, pack);

			Decks.update(deck._id, deck);
		}
		pickdraftcard(packu, decku, cardindex);
		
		//process computer picks
		var packc;
		for(var i=0; i!=draft.players.length; ++i)
			if(draft.players[i] == "computer")			
			{
				var deckc = Decks.findOne({draftid: draftid, owner: "computer", seat: i});
				while(packc = Packs.findOne(
							{draftid: draftid, seat: i},
							{sort: {pick: 1}})) //while computer still has picks...
				{
					var choice = computerpick(deckc, packc);
					pickdraftcard(packc, deckc, choice);
				}
			}
		//////////////////
		
		//if there are no more packs for the draft...
		if(Packs.find({draftid: draftid}).count() <= 0)
		{
			console.log("packs all done");
			//check if there is another pack we can open...
			if(++draft.openpack < draft.packs.length)
			{
				opennextpack(draft); //everyone opens a new pack.
				console.log("opened new packs");
				Drafts.update({id: draftid}, draft); //update the openpack int he DB
			}
			else //otherwise we are finished the draft.
				Drafts.update({id: draftid}, {$set: {status: "finished"}});
		}
	},
});

