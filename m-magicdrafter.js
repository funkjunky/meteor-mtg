if(Meteor.isClient)
{
	Router.configure({
		layout: 'layout',
		loadingTemplate: 'loading',
		notFoundTemplate: 'notfound',
	});
	Router.map(function() {
		//this.route('home', {path: '/'});
		drafterRoute.apply(this);
		builderRoute.apply(this);
		sealedRoute.apply(this);
		draftSetupRoute.apply(this);
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
	  Meteor.publish("Packs", function(draftid, seat) {
		  return Packs.find({draftid: draftid, seat: seat}, {sort: {pick: 1}});
	  });
	  Meteor.publish("Drafts", function(draftid) {
		  return Drafts.find({id: draftid});
	  });
  });
}
