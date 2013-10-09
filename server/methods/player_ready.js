Meteor.methods({
	player_ready: function(draftid) {
		var username = Meteor.user().username;
		var draft = Drafts.findOne({id: draftid});

		console.log(Drafts.findOne({id: draftid}).ready);
		if(draft.ready.indexOf(username) === -1)
			Drafts.update({id: draftid}, {$push: {ready: username}});
		console.log(Drafts.findOne({id: draftid}).ready);

		//if we all our players responded as active,then start draft!
		draft = Drafts.findOne({id: draftid});
		if(draft.ready.length == draft.players.length)
		{
			draft.status = "inprogress";
			Drafts.update({id: draftid}, {$set: {status: "inprogress"}});
			Meteor.call("start_draft", draftid);
		}
	},
});
