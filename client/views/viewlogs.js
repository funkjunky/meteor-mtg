viewLogsRoute = function() {
	this.route('viewlogs', {
		path: '/viewlogs',
		waitOn: function() {
			return [
				Meteor.subscribe('AllLogs'),
			];
		},
		onAfterRun: function() {
			Session.set("route", "viewlogs");
		},
		data: function() {
			return {
				logs: Logs.find().fetch(),
			};
		},
	});
};
