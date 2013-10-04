viewFeedbacksRoute = function() {
	this.route('viewfeedbacks', {
		path: '/viewfeedbacks',
		waitOn: function() {
			return [
				Meteor.subscribe('AllFeedbacks'),
			];
		},
		data: function() {
			return {
				feedbacks: Feedbacks.find().fetch(),
			};
		},
	});
};
