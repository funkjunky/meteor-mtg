Template.draftcard.events = {
	"click .pickCard": function(event) {
		console.log("draftcard clicked. I'll call meteor.methods now!");
		var $this = event.srcElement;
		Meteor.call("pickcard", _draftid, "jason", 0, $($this).parent().data('id'),
				function(err, res) {
					console.log('done meteor.method:');
					console.log(err);
					console.log(res);
				}
		);
	},
};
