//TODO: implement this event for leaving a draft, only for draft routes... and using the draftid that we are currently on.
Meteor.startup(function() {
	$(window).bind("beforeunload", function() {
		//console.log("draftid: " + Session.get('draftid'));
		//console.log("route: " + Session.get('route'));
		if(Session.get('route') != "draftlobby")
			return null;

		console.log('draftid: ' + Session.get('draftid'));

		Meteor.call("leaving_draft", Session.get('draftid'), function(){});
		return null;
		//return "Are you sure you want to leave the lobby?";
	});
});
draftLobbyRoute = function() {
	this.route('draftlobby', {
		path: '/draftlobby/:draftid',
		waitOn: function() {
			return [
				Meteor.subscribe('Drafts', parseInt(this.params.draftid)),
			];
		},
		onAfterRun: function() {
			Session.set("route", "draftlobby");
		},
		data: function() {
			Session.set('draftid', parseInt(this.params.draftid));
			var user = Meteor.user();
			var draftCursor = Drafts.find({id: parseInt(this.params.draftid)});
			var draft = draftCursor.fetch()[0];
			draftCursor.observeChanges({
				changed: function(id, fields) {
					if(fields.status == "starting")
						Meteor.call("player_ready", draft.id);
					else if(fields.status && fields.status == "inprogress")
						Router.go("/draft/"+draft.id);
				},
			});
			//if the player isn't already in the draft, then add them.
			if(draft.players.indexOf(user.username) === -1)
			{
				draft.players.push(user.username)
				Drafts.update({_id: draft._id}, draft);
			}

			return {
				draft: draft,
			};
		},
	});
};

Template.draftlobby.events({
	"click #startwithbots, click #startwithoutbots": function(event) {
		var $this = event.target || event.srcElement;
		var withbots = $($this).data('withbots');
		var draftid = $($this).parent().parent().data('draftid');

		Meteor.call("try_draft", draftid, withbots,
			function(err, res) {
				console.log("done meteor.method 'try_draft'");
				console.log(err);
				console.log(res);

				//start a ten second timer, after ten seconds call, cull_dced, which will remove all players not in the ready list and on return alert that the draft was canceled bcause a player DCd.
				Meteor.setTimeout(function() {
					Meteor.call("cull_disconnected", draftid, function(err, res) {
						console.log("done cull_disconnected");
						console.log(err);
						console.log(res);
					});
				}, 10000);

				//if(!err && res)
				//	Router.go('drafter', {draftid: res.draftid});
			}
		);
	},
});
