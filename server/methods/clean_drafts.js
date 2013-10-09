Meteor.methods({
	"clean_drafts": function() {
		var fourhours = 1000 * 60 * 60 * 4;
		Drafts.remove({timestamp: {$lt: Date.now() - fourhours}});
	},
});
