opennextpack = function(draft)
{
	//all the players get a new pack to open
	for(var i = 0; i != draft.players.length; ++i)
		Packs.insert({
			draftid: draft.id,
			owner: draft.players[i],
			seat: i,
			cards: getpack(draft.packs[draft.openpack]),
			pick: 0,
		});
};
