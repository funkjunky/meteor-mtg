Meteor.methods({
	pickcard: function(draftid, owner, seat, cardindex) {
		var packu = Packs.findOne(
				{draftid: draftid, seat: seat},
				{sort: {pick: 1}});
		var decku = Decks.findOne({draftid: draftid, owner: owner, seat: seat});
		var draft = Drafts.findOne({draftid: draftid});

		var pickdraftcard = function(pack, deck, index)
		{
			var card = pack.cards[cardindex];

			//add the card to the users deck
			deck.pool.push(card);
			//remove the card from the pack
			pack.cards.splice(cardindex, 1);
			//update the pick counter (necessary for order)
			++pack.pick;

			//pass the card to the next seat
			//TODO: should pass left, then right, then left [desc, asc, desc]
			pack.seat = (pack.seat + 1) % draft.players.length;
			//update the owner of the pack appropriately
			pack.owner = draft.players[pack.seat];
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
				while((packc = Packs.find(
							{draftid: draftid, seat: i},
							{sort: {pick: 1}})).count() >= 1) //while computer still has picks...
					pickdraftcard(packc, deckc, rand_int(packc.cards.length));
			}
		//////////////////
		
		//if all packs cards.length <= 0, then set status of draft to "finished"
		if(Packs.find({draftid: draftid, pick: 14}).count() >= Drafts.findOne({id: draftid}).players.length)
			Drafts.update({id: draftid}, {status: "finished"});
	},
});

