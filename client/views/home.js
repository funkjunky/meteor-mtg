homeRoute = function() {
	this.route('home', {
		path: '/',
		waitOn: function() {
			var username = Meteor.user().username;
			return [
				Meteor.subscribe('PlayerDecks', username),
				Meteor.subscribe('PlayerDrafts', username),
				Meteor.subscribe('OpenDrafts'),
			];
		},
		onAfterRun: function() {
			Session.set("route", "home");
		},
		data: function() {
					console.log(Decks.find({owner: Meteor.user().username}).fetch());
			return {
				decks: Decks.find({owner: Meteor.user().username}).fetch(),
				active_drafts: Drafts.find({players: Meteor.user().username}).fetch(),
				open_drafts: Drafts.find({status: 'lobby'}),
			};
		},
	});
};

Template.home.events({
	"click #draftsetup": function() {
		Router.go("draftsetup");
	},
	"click #sealedsetup": function() {
		Router.go("sealedsetup");
	},
});
