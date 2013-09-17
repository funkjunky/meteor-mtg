_draftid = -1;
drafterRoute = function() {
	this.route('drafter', {
		path: '/draft/:draftid',
		waitOn: function() {
			_draftid = parseInt(this.params.draftid);
			return [
				Meteor.subscribe('DraftDeck', "jason", parseInt(this.params.draftid)),
				Meteor.subscribe('Packs', parseInt(this.params.draftid), 0),
				Meteor.subscribe('Drafts', parseInt(this.params.draftid)),
			];
		},
		data: function() {
			var draftid = parseInt(this.params.draftid);
			return {
				pack: Packs.findOne({draftid: draftid, seat: 0}, {sort: {pick: 1}}),
				draft: Drafts.findOne({id: draftid}),
				deck: Decks.findOne({owner: "jason", draftid: draftid}),
			};
		},
	});
};
