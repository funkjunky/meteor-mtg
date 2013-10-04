deckRoute = function() {
	this.route('deck', {
		path: '/deck/:deckname',
		waitOn: function() {
			return [
				Meteor.subscribe('Decks', this.params.deckname)
			];
		},
		data: function() {
			return {
				deck: Decks.findOne({name: this.params.deckname}),
			};
		},
	});
};
