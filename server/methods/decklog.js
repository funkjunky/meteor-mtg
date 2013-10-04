Meteor.methods({
	deckLog: function(deckname, name, from, to) {
		Logs.update({deckname: deckname}, {$push: {changes: {
			timestamp: Date.now(),
			name: name,
			from: from,
			to: to,
		}}});
	},
});
