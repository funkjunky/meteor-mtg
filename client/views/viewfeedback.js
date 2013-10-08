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
		},
		data: function() {
			return {
				feedbacks: Feedbacks.find().fetch(),
			};
		},
	});
};
