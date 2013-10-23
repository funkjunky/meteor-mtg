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
			document.title = "MTG Drafter - View Logs";
		},
		data: function() {
			return {
				logs: Logs.find().fetch(),
			};
		},
	});
};
