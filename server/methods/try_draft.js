Meteor.methods({
	try_draft: function(draftid, withbots) {
		var draft = Drafts.findOne({id: draftid});
		draft.status = "starting";
		draft.withbots = withbots;

		Drafts.update({id: draftid}, draft);
		Logs.update({id: "draft-"+draftid}, {$push: {updates: {
			eventsummary: "attempting to start the draft",
			timestamp: Date.now(),
		}}});
	},
});
