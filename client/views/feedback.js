Template.feedback.events({
	"submit #feedback": function(event) {
		event.preventDefault();
		var form = $(event.srcElement).serializeArray();
		Meteor.call("report_feedback", form[0].value, form[1].value);
		var $this = event.target || event.srcElement;
		$this.reset();
		return false;
	},
});
