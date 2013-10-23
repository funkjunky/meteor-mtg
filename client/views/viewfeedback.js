viewFeedbacksRoute = function() {
	this.route('viewfeedbacks', {
		path: '/viewfeedbacks',
		waitOn: function() {
			return [
				Meteor.subscribe('AllFeedbacks'),
			];
		},
		onAfterRun: function() {
			Session.set("route", "viewfeedbacks");
			document.title = "MTG Drafter - View Feedback";
		},
		data: function() {
			return {
				feedbacks: Feedbacks.find().fetch(),
			};
		},
	});
};
