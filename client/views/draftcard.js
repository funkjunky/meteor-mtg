Template.draftcard.events ({
	"click .cardimage": function(event) {
		var $this = event.target || event.srcElement;
		//TODO: get the seat somewhere else...
		var seat = $("#wholedraft").data('seat');
		Meteor.call("pickcard", _draftid, Meteor.user().username, seat, $($this).parent().parent().data('id'),
				function(err, res) {
					console.log('done meteor.method:');
					console.log(err);
					console.log(res);
				}
		);
	},
});
