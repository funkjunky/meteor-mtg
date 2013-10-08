currentDeck = {};
_nameToIndex = {};
_deckname = "";
builderRoute = function() {
	this.route('builder', {
		path: '/builder/:deckname',
		waitOn: function() {
			return [
				Meteor.subscribe('Decks', this.params.deckname),
			];
		},
		onAfterRun: function() {
			Session.set("route", "builder");
		},
		data: function() {
			//TODO: currentDecks should be phased out at some point...
			currentDeck = Decks.findOne({name: this.params.deckname});
			if(currentDeck.owner != Meteor.user().username)
			{
				alert("This isn't your deck! Go to readonly mode!");
				Router.go("/deck/"+this.params.deckname);
			}
			_deckname = this.params.deckname;
			//TODO: try and phase this out or something
			//This is a map, so we can get the pool's array index from a card name.
			//Necessary when turning getting cards using the text board from the pool.
			for(var i=0; i!=currentDeck.pool.length; ++i)
				_nameToIndex[currentDeck.pool[i].name] = i;
			return {
				deck: Decks.findOne({name: this.params.deckname}),
			};
		},
	});
};

	Template.builder.events({
		"click #stacked": stacked_click,
	});
