_draftid = -1;
drafterRoute = function() {
	this.route('drafter', {
		path: '/draft/:draftid',
		waitOn: function() {
			_draftid = parseInt(this.params.draftid);
			return [
				Meteor.subscribe('DraftDeck', Meteor.user().username, parseInt(this.params.draftid)),
				Meteor.subscribe('Packs', parseInt(this.params.draftid), Meteor.user().username),
				Meteor.subscribe('Drafts', parseInt(this.params.draftid)),
			];
		},
		onAfterRun: function() {
			document.title = "MTG Drafter - Drafting";
		},
		data: function() {
			Session.set('draftid', parseInt(this.params.draftid));
			Session.set("route", "draft");
			//this should be in onAfterRun, but apparently it doesn't have subscriptions at that time.
			if(!Decks.find({owner: Meteor.user().username, draftid: parseInt(this.params.draftid)}).count())
			{
				alert("You do not belong in this draft! Sending you back home.");
				Router.go("home");
			}
			var draftid = parseInt(this.params.draftid);
			var pack = Packs.findOne({draftid: draftid, owner: Meteor.user().username}, {sort: {pick: 1}});
			var draftCursor = Drafts.find({id: draftid});
			var draft = draftCursor.fetch()[0];
			//TODO: use the deck var everywhere... wtf?
			var deck = Decks.findOne({owner: Meteor.user().username, draftid: draftid});
			if(draft.status == "finished")
				Router.go("/builder/"+deck.name);

			deck.sideboard = sortcolours(deck.sideboard);

			if(!draft.timer_disabled)
			{
				//set timer for pick
				Meteor.setInterval(function() {
					//console.log(Session.get("timeleft"));
					//console.log(draft.pickTimeout);
					if(!pack)
						return;
					console.log("timeout: " + getTimeout(draft, pack));
					Session.set("timeleft", parseInt(getTimeout(draft, pack)));
					if(draft.quickpick.indexOf(Meteor.user().username) != -1 || Session.get("timeleft") < 0)
						Meteor.call("pickcard", draftid, false);
				}, 500);
			}

			var deckname = Decks.findOne({owner: Meteor.user().username, draftid: parseInt(this.params.draftid)}).name;

			//TODO: may not be necessary because of the above check with status.
			draftCursor.observeChanges({
				changed: function(id, fields) {
					if(fields.status == "finished")
						Router.go("/builder/"+deckname);
				},
			});

			return {
				timeleft: Session.get("timeleft"),
				pack: pack,
				draft: draft,
				deck: deck, 
					//Decks.findOne({owner: Meteor.user().username, draftid: draftid}),
			};
		},
		onAfterRun: function() {
			//fuck, i dont know why onAfterRun doesn't have access to the subscribed data...
			/*
			Meteor.setTimeout(function() {
			//set timer for pick
			Meteor.setInterval(function() {
				var draftid = _draftid;
				var pack = Packs.findOne({draftid: draftid, owner: Meteor.user().username}, {sort: {pick: 1}});
				var draft = Drafts.findOne({id: draftid});
				//console.log(Session.get("timeleft"));
				//console.log(draft.pickTimeout);
				if(!pack)
					return;
				if(draft.quickpick.indexOf(Meteor.user().username) == -1)
					Session.set("timeleft", parseInt(getTimeout(draft, pack)));
				if(draft.quickpick.indexOf(Meteor.user().username) != -1 || Session.get("timeleft") < 0)
				{
					Session.set("timeleft", "Auto-Picking");
					console.log("calling pickcard");
					Meteor.call("pickcard", draftid, false, 0, 0, function(err, res) {
						console.log("returned from pickcard");
						console.log(err);
						console.log(res);
					});
				}
			}, 500);
		}, 1000);
		*/
		},
	});
};

getTimeout = function(draft, pack) {
	return (draft.pickTimeout + ((14 - pack.pick) * 4)) - ((Date.now() - pack.pickTimestamp) / 1000);
};
/*
			Template.drafter.timeleft = function() {
				Session.get("timeleft");
			};
*/
