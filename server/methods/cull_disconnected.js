Meteor.methods({
	cull_disconnected: function(draftid) {
		var draft = Drafts.findOne({id: draftid});

		for(var i = draft.players.length-1; i >= 0; --i)
			if(draft.players[i] != "computer" && draft.ready.indexOf(draft.players[i]) == -1)
			{
				console.log("Removed user from draft: " + draft.players[i]);
				Logs.update({id: "draft-"+draftid}, {$push: {updates: {
					eventsummary: "culled user from draft for not being ready when starting the draft",
					timestamp: Date.now(),
					user: draft.players[i],
				}}});
				draft.players.splice(i, 1);
			}

		draft.status = "lobby";

		Drafts.update({id: draftid}, draft);
	},
});
