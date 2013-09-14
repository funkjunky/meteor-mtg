Template.draftcard.events = {
	"click .pickCard": function(event) {
		console.log("draftcard clicked. I'll call meteor.methods now!");
		var $this = event.srcElement;
		//Decks.update(_id, currentDeck);
	},
};
