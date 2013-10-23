sealedRoute = function() {
	this.route('sealedsetup', {
		path: '/sealed',
		waitOn: function() {
			return [
				Meteor.subscribe('SetNames'),
			];
		},
		onAfterRun: function() {
			Session.set("route", "sealed");
			document.title = "MTG Drafter - Sealed Setup";
		},
		data: function() {
			return {
				sets: Sets.find().fetch(),
				num_of_packs: 6,
			};
		},
	});
};

Template.sealedsetup.events({
	"submit #sealedForm": function(event) {
		var $this = event.target || event.srcElement;
		var sets = $().serializeArray();
		for(var i=0; i!=sets.length; ++i)
			sets[i] = sets[i].value;

		
		Meteor.call("create_sealed_deck", sets,
				function(err, res) {
					console.log('done meteor.method "create_sealed_deck"');
					console.log(err);
					console.log(res);

					if(!err && res)
						Router.go('builder', {deckname: res.name});
				}
		);

		return false;
	},
});
