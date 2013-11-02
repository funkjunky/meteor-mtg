Meteor.methods({
	clonedeck: function(deck_id) {
		var deck = Decks.findOne({_id: deck_id});
		delete deck._id;
		var count = 0;
		if((count = Decks.find({name: deck.name, owner: Meteor.user().username}).count()) !=0)
			deck.name += "__clone";

		var _id = Decks.insert(deck);

		return "/builder/"+_id;
	},
});
