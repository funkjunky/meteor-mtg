draftSetupRoute = function() {
	this.route('draftsetup', {
		path: '/draftsetup',
		waitOn: function() {
			return [
				Meteor.subscribe('SetNames'),
			];
		},
		data: function() {
			return {
				sets: Sets.find().fetch(),
				num_of_packs: 3,
			};
		},
	});
};

Template.draftsetup.events = {
	"submit #draftForm": function(event) {
		var sets = $(event.srcElement).serializeArray();
		for(var i=0; i!=sets.length; ++i)
			sets[i] = sets[i].value;
		
		var num_of_bots = $("#bots").val();

		Meteor.call("create_draft", sets, num_of_bots,
				function(err, res) {
					console.log("done meteor.method 'create_draft'");
					console.log(err);
					console.log(res);

					if(!err && res)
						Router.go('drafter', {draftid: res.draftid});
				}
		);

		return false;
	},
};
