Meteor.methods({
	create_draft: function(sets, num_of_bots) {
		var id = Date.now();
		var players = ["jason"];
		var packs = sets;
		var date = new Date();
		var name = "_draft-" + date.getDate() + "_" + (date.getMonth()+1) + "_" + date.getFullYear() + "_" + implode(sets, "-") + "_" + Date.now();

		//fill in the bots
		for(var i=0; i < num_of_bots; ++i)
			players.push("computer");

		console.log("creating draft, id: " + id);

		//Create the draft
		Drafts.insert({
			id: id,
			status: "inprogress",
			players: players,
			packs: packs,
			openpack: 0,
		});
		
		//give all the players their first pack
		for(var i=0; i!=players.length; ++i)
			Packs.insert({
				draftid: id,
				owner: players[i],
				seat: i,
				cards: getpack(packs[0]),
				pick: 0,
			});

		//give all the players their deck for the draft
		for(var i=0; i!=players.length; ++i)
			Decks.insert({
				name: players[i] + name,
				owner: players[i],
				seat: i,
				mainboard: [],
				sideboard: [],
				pool: [],
				draft: true,
				draftid: id,
				draftinprogress: true,
			});

		return {
			draftid: id,
		};
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
