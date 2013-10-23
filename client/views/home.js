homeRoute = function() {
	this.route('home', {
		path: '/',
		waitOn: function() {
			var subscriptions = [Meteor.subscribe('OpenDrafts')];
			if(Meteor.user())
			{
				subscriptions.push(Meteor.subscribe('PlayerDecks', Meteor.user().username))
				subscriptions.push(Meteor.subscribe('PlayerDrafts', Meteor.user().username))
			}
			return subscriptions
		},
		onAfterRun: function() {
			Session.set("route", "home");
		},
		data: function() {
			var data = {
				open_drafts: Drafts.find({status: 'lobby'}),
				latest_set: "THS",
			};

			if(Meteor.user())
			{
				data.decks = Decks.find({owner: Meteor.user().username}).fetch();
				var active_draft = Drafts.findOne({players: Meteor.user().username, status: "inprogress"});
				if(active_draft)
					data.active_draft_url = "draft/"+active_draft.id;
			}
			return data;
		},
	});
};

Template.home.events({
	"click #draftsetup": function() {
		Router.go("draftsetup");
	},
	"click #cleandrafts": function() {
		Meteor.call("clean_drafts");
	},
	"click #sealedsetup": function() {
		Router.go("sealedsetup");
	},
	"click #botdraft": function() {
		Meteor.call("create_draft", ['THS', 'THS', 'THS'], 8, true, function(err, res) {
			var draftid = res.draftid;
			console.log("create_draft with bots");
			console.log(err);
			console.log(res);
			Meteor.call("try_draft", draftid, true, function(err, res) {
				Meteor.call("start_draft", draftid, function(err, res) {
					Router.go("/draft/"+draftid);
				});
			});
		});
	},
});
