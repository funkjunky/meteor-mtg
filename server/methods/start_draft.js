Meteor.methods({
	start_draft: function(draftid) {
		var draft = Drafts.findOne({id: draftid});
		var date = new Date();
		var name = "_draft-" + date.getDate() + "_" + (date.getMonth()+1) + "_" + date.getFullYear() + "_" + implode(draft.packs, "-") + "_" + Date.now();

		//fill in the bots
		if(draft.withbots)
		{
			var num_of_bots = draft.numberOfSeats - draft.players.length;
			for(var i=0; i < num_of_bots; ++i)
				draft.players.push("computer");
		} else
			draft.numberOfSeats = draft.players.length; //set the numberOfSeats correctly

		//set the timeout for the draft
		draft.pickTimeout = 30;
		
		//give all the players their first pack
		for(var i=0; i!=draft.players.length; ++i)
			Packs.insert({
				draftid: draft.id,
				owner: draft.players[i],
				seat: i,
				cards: getpack(draft.packs[0]),
				pickTimestamp: Date.now(),
				pick: 0,
			});

		//give all the players their deck for the draft
		for(var i=0; i!=draft.players.length; ++i)
			Decks.insert({
				name: draft.players[i] + name,
				owner: draft.players[i],
				seat: i,
				mainboard: [],
				sideboard: [],
				pool: [],
				draft: true,
				draftid: draft.id,
				draftinprogress: true,
			});

		//create a log for each seat
		for(var i=0; i!=draft.players.length; ++i)
			Logs.insert({
				id: "draft-" + draft.id + "-seat_" + i,
				owner: draft.players[i],
				pickstate: [],
			});

		draft.status = "inprogress";
		Drafts.update({_id: draft._id}, draft);

		return {draftid: draft.id};
	},
});

function implode(array, del)
{
	if(array.length === 0) return "";
	var str = "";
	for(var i=0; i!=array.length; ++i)
		str += array[i] + del;

	return str.substr(0, str.length - del.length);
}
