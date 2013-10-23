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
	/*
	if(!Meteor.user())
		console.log("not logged in apparently");
	*/

	drafterRoute.apply(this);
	builderRoute.apply(this);
	sealedRoute.apply(this);
	draftSetupRoute.apply(this);
	draftLobbyRoute.apply(this);
	deckRoute.apply(this);
	viewLogsRoute.apply(this);
	viewFeedbacksRoute.apply(this);
});
