Template.draftcard.events ({
	"click .pickCard": function(event) {
		console.log("draftcard clicked. I'll call meteor.methods now!");
		var $this = event.srcElement;
		//TODO: get the seat somewhere else...
		var seat = $("#wholedraft").data('seat');
		console.log("seat: " + seat);
		Meteor.call("pickcard", _draftid, Meteor.user().username, seat, $($this).parent().data('id'),
				function(err, res) {
					console.log('done meteor.method:');
					console.log(err);
					console.log(res);
				}
		);
	},
});
