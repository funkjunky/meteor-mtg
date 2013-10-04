Meteor.methods({
	pickcard: function(draftid, owner, seat, cardindex) {
					 console.log("pickcard");
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
			//update the timestamp
			pack.pickTimestamp = Date.now();

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

		if(owner) {
			var packu = Packs.findOne(
					{draftid: draftid, seat: seat},
					{sort: {pick: 1}});
			var decku = Decks.findOne(
					{draftid: draftid, owner: owner, seat: seat});

			//TODO: the name should be in a function everyone users
			//Logging/////
			var pool = [];
			for(var i=0; i!=decku.pool.length; ++i)
				pool.push(decku.pool[i].name);
			Logs.update(
				{id: "draft-"+draftid+"-seat_"+seat},
				{$push: {pickstate: {
						pack: draft.openpack,
						pick: packu.pick,
						choice: packu.cards[cardindex].name,
						pool: pool,
				}}}
			);
			////////////
			//after logging, otherwise i dont have the card im picking [ie index is off]
			pickdraftcard(packu, decku, cardindex);

			//remove you from warning and quickpick list, if need be.
			var index;
			if((index = draft.warning.indexOf(owner)) != -1)
			{
				draft.warning.splice(index, 1);
				Logs.update({id: "draft-"+draftid}, {$push: {updates: {
					eventsummary: "user removed from warning",
					pick: packu.pick,
					user: owner,
				}}});
			}
			if((index = draft.quickpick.indexOf(owner)) != -1)
			{
				draft.warning.splice(index, 1);
				Logs.update({id: "draft-"+draftid}, {$push: {updates: {
					eventsummary: "user removed from quickpick",
					pick: packu.pick,
					user: owner,
				}}});
			}
		}

		//check players for timeouts
		//TODO: disable if it's a solo-draft, also remove timer.
		for(var i=0; i!=draft.players.length; ++i)
		{
			var packp = Packs.findOne({draftid: draftid, seat: i});
			if(!packp)
				continue;
			var deckp = Decks.findOne({draftid: draftid, owner: draft.players[i], seat: i});
			//if their pack has timed out... or they are no longer considered active
			//Note: You get one warning, then your packs are quickly passed =P
			if(draft.quickpick.indexOf(draft.players[i]) != -1
					|| 0 > getTimeout(draft, packp))
			{
				//pick a card for them
				pickdraftcard(packp, deckp, computerpick(deckp, packp));
				//escalate players warning level
				if(draft.warning.indexOf(draft.players[i]) == -1)
				{
					draft.warning.push(draft.players[i]);
					Logs.update({id: "draft-"+draftid}, {$push: {updates: {
						eventsummary: "user added to warning",
						pick: packp.pick,
						user: owner,
					}}});
				}
				else if(draft.quickpick.indexOf(draft.players[i]) == -1)
				{
					draft.quickpick.push(draft.players[i]);
					Logs.update({id: "draft-"+draftid}, {$push: {updates: {
						eventsummary: "user added to quickpick",
						pick: packp.pick,
						user: owner,
					}}});
				}

				Drafts.update({id: draft.id}, draft);
			}
				

		}
		
		//process computer picks
		var packc;
		if(!Drafts.findOne({id: draftid}).computer_locked) {
			//only one usercan run the computers picks at a time.
			Drafts.update({id: draftid}, {$set: {computer_locked: true}});
			while(packc = Packs.findOne(
						{draftid: draftid, owner: "computer"},
						{sort: {pick: 1}})) //while computer still has picks...
			{
				var deckc = Decks.findOne({draftid: draftid, owner: "computer", seat: packc.seat});
				pickdraftcard(packc, deckc, computerpick(deckc, packc));
			}
			Drafts.update({id: draftid}, {$set: {computer_locked: false}});
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
				Logs.update({id: "draft-"+draftid}, {$push: {updates: {
					eventsummary: "opened new pack",
					timestamp: Date.now(),
					prevset: draft.packs[draft.openpack-1],
					nextset: draft.packs[draft.openpack],
					openpack: draft.openpack,
					totalpacks: draft.packs.length,
				}}});
				Drafts.update({id: draftid}, draft); //update the openpack int he DB
			}
			else //otherwise we are finished the draft.
			{
				Drafts.update({id: draftid}, {$set: {status: "finished"}});
				Logs.update({id: "draft-"+draftid}, {$push: {updates: {
					eventsummary: "finished draft",
					timestamp: Date.now(),
				}}});
			}
		}
		console.log("done pickcard");
	},
});

getTimeout = function(draft, pack) {
	return (draft.pickTimeout + ((14 - pack.pick) * 4)) - ((Date.now() - pack.pickTimestamp) / 1000);
};
