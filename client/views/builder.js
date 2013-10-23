builderRoute = function() {
	this.route('builder', {
		path: '/builder/:deckname',
		waitOn: function() {
			_deckname = this.params.deckname;
			return [
				Meteor.subscribe('Decks', this.params.deckname),
			];
		},
		onAfterRun: function() {
			Session.set("route", "builder");
		},
		data: function() {
			//TODO: currentDecks should be phased out at some point...
			currentDeck = Decks.findOne({name: this.params.deckname});
			if(currentDeck.owner != Meteor.user().username)
			{
				alert("This isn't your deck! Go to readonly mode!");
				Router.go("/deck/"+this.params.deckname);
			}
			//TODO: try and phase this out or something
			//This is a map, so we can get the pool's array index from a card name.
			//Necessary when turning getting cards using the text board from the pool.
			//for(var i=0; i!=currentDeck.pool.length; ++i)
			//	_nameToIndex[currentDeck.pool[i].name] = i;
			
			//sort by name
			currentDeck.pool.sort(function(a, b) {
				return (a.name < b.name)?-1:1;
			});
			//sorting by colours
			var colours = {W:[],B:[],G:[],R:[],U:[],A:[],L:[],MC:[]};
			for(var i=0; i!=currentDeck.pool.length; ++i)
				if(currentDeck.pool[i].color.length > 1)
					colours["MC"].push(currentDeck.pool[i]);
				else
					colours[currentDeck.pool[i].color].push(currentDeck.pool[i]);

			var newpool = [];
			for(var k in colours)
				for(var i=0; i!=colours[k].length; ++i)
					newpool.push(colours[k][i]);
			currentDeck.pool = newpool;

			return {
				deck: currentDeck,
			};
		},
	});
};
Template.builder.created = function() {
	//for shortcuts of filters
	$("body").keyup(function(event) {
		if($("input,textarea").is(":focus"))
			return; //dont want to interrupt text input

		switch(event.which)
		{
			case 85: //U
				$("#U").click(); break;
			case 66: //B
				$("#B").click(); break;
			case 87: //W
				$("#W").click(); break;
			case 82:	//R
				$("#R").click(); break;
			case 71:	//G
				$("#G").click(); break;
			case 65: //A
				$("#A").click(); break;
			case 76: //L
				$("#L").click(); break;
		}
	});
};

	Template.builder.events({
		"click #stacked": stacked_click,
		"change .builderfilters input": function(event) {
			var $this = event.target || event.srcElement;
			var colour = $this.id;
			$this = $($this);
			if($this.prop('checked'))
				$("."+colour).show();
			else
				$("."+colour).hide();
		},
	});
