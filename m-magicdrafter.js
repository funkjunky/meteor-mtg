if(Meteor.isClient)
{
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_EMAIL',
	});
	Router.configure({
		layout: 'layout',
		loadingTemplate: 'loading',
		notFoundTemplate: 'notfound',
	});
	Router.map(function() {
		//do chat stuff
		Meteor.subscribe('LatestChatMessages');
		Template.chatroom.chatmessages = function() {
			return ChatMessages.find().fetch();
		};
		///////

		homeRoute.apply(this);
		//can't really do anything until logged in.
		if(!Meteor.user())
		{
			console.log("not logged in apparently");
			return;
		}

		drafterRoute.apply(this);
		builderRoute.apply(this);
		sealedRoute.apply(this);
		draftSetupRoute.apply(this);
		draftLobbyRoute.apply(this);
		deckRoute.apply(this);
		viewLogsRoute.apply(this);
		viewFeedbacksRoute.apply(this);
	});
}
if (Meteor.isServer) {
  Meteor.startup(function () {
	  Meteor.publish("Decks", function(name) {
		  return Decks.find({name: name});
	  });
	  Meteor.publish("DraftDeck", function(owner, draftid) {
		  return Decks.find({owner: owner, draftid: draftid});
	  });
	  Meteor.publish("SetNames", function() {
		  return Sets.find({}, {fields: {name:1}});
	  });
	  Meteor.publish("Sets", function(name) {
		  return Sets.find({name: name});
	  });
	  Meteor.publish("Packs", function(draftid, owner) {
		  return Packs.find({draftid: draftid, owner: owner}, {sort: {pick: 1}});
	  });
	  Meteor.publish("Drafts", function(draftid) {
		  return Drafts.find({id: draftid});
	  });
	  Meteor.publish("PlayerDrafts", function(username) {
		  return Drafts.find({players: username}); 
	  });
	  Meteor.publish("PlayerDecks", function(username) {
		  console.log(Decks.find({owner: username, draftinprogress: {$ne: true}}).count());
		  return Decks.find({owner: username, draftinprogress: {$ne: true}});
	  });
	  Meteor.publish("OpenDrafts", function() {
		  //TODO: filter out full lobbys.
		  return Drafts.find({status: 'lobby'});
	  });
	  Meteor.publish("AllLogs", function() {
		  return Logs.find({}, {sort: {timestamp: -1}});
	  });
	  Meteor.publish("AllFeedbacks", function() {
		  return Feedbacks.find({}, {sort: {timestamp: -1}});
	  });
	  Meteor.publish("LatestChatMessages", function() {
		  var minutes = 60;
		  var maxMessages = 800;

			//console.log(ChatMessages.find({timestamp: {$gt: Date.now() - (minutes * 60 * 1000)}}).fetch());

			return ChatMessages.find({timestamp: {$gt: Date.now() - (minutes * 60 * 1000)}});
	  });
  });
}
