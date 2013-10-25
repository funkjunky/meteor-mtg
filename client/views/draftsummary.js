draftSummaryRoute = function() {
	this.route('draftsummary', {
		path: '/draftsummary/:draftid',
		waitOn: function() {
			return [
				Meteor.subscribe('Drafts', parseInt(this.params.draftid)),
				Meteor.subscribe('Draftstats', parseInt(this.params.draftid)),
			];
		},
		onAfterRun: function() {
			Session.set('route', 'draftsummary');
			document.title= "MTG Drafter - Draft Summary";
		},
		data: function() {
			var draftstats = Draftstats.find({draftid: parseInt(this.params.draftid)}, {sort: {seat: 1}}).fetch();
			var keyed_stats = [];

			return {
				draft: Drafts.findOne({id: parseInt(this.params.draftid)}),
				draftstats: draftstats,
			};
		},
	});
};
