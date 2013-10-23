draftSetupRoute = function() {
	this.route('draftsetup', {
		path: '/draftsetup',
		waitOn: function() {
			return [
				Meteor.subscribe('SetNames'),
			];
		},
		onAfterRun: function() {
			Session.set("route", "draftsetup");
		},
		data: function() {
			console.log(Meteor.user());
			return {
				sets: Sets.find().fetch(),
				num_of_packs: 3,
			};
		},
	});
};

Template.draftsetup.events({
	"submit #draftForm": function(event) {
		event.preventDefault();
		$this = event.target || event.srcElement;
		var sets = $($this).serializeArray();
		for(var i=0; i!=sets.length; ++i)
			sets[i] = sets[i].value;

		var numberOfSeats = $("#numberOfSeats").val();
		var timer_disabled = $("#timer_disabled").prop('checked');
		
		Meteor.call("create_draft", sets, numberOfSeats, timer_disabled,
				function(err, res) {
					console.log("done meteor.method 'create_draft'");
					console.log(err);
					console.log(res);

					if(!err && res)
						Router.go('draftlobby', {draftid: res.draftid});
				}
		);

		return false;
	},
});
