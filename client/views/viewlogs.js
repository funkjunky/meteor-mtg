viewLogsRoute = function() {
	this.route('viewlogs', {
		path: '/viewlogs',
		waitOn: function() {
			return [
				Meteor.subscribe('AllLogs'),
			];
		},
		data: function() {
			return {
				logs: Logs.find().fetch(),
			};
		},
	});
};
