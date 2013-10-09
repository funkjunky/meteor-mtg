Meteor.methods({
	leaving_draft: function(draftid) {
		var username = Meteor.user().username;
		console.log(username + ' is leaving, draft: ' + draftid);
		var draft = Drafts.findOne({id: draftid});

		for(var i=0; i<=draft.players.length; ++i)
			if(draft.players[i] == username)
				draft.players.splice(i, 1);

		Drafts.update(draft._id, draft);
		if(Drafts.findOne({_id: draft._id}).players.length <= 0)
			Drafts.remove({_id: draft._id});
	},
});
