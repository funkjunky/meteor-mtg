deckRoute = function() {
	this.route('deck', {
		path: '/deck/:owner/:deckname',
		waitOn: function() {
			return [
				Meteor.subscribe('RODecks', this.params.owner, this.params.deckname)
			];
		},
		onAfterRun: function() {
			Session.set("route", "deck");
		},
		data: function() {
			return {
				deck: Decks.findOne({owner: this.params.owner, name: this.params.deckname}),
			};
		},
	});
};
