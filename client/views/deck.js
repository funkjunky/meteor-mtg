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
			currentDeck = Decks.findOne({owner: this.params.owner, name: this.params.deckname});
			return {
				deck: currentDeck,
			};
		},
	});
};

Template.deck.events({
	"click #clonedeck": function(event) {
		Meteor.call("clonedeck", currentDeck._id, function(err, res) {
			console.log("done meteor.method 'clonedeck'");
			console.log(err);
			console.log(res);
			Router.go(res);
		});
	},
});
