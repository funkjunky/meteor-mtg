builderRoute = function() {
	this.route('builder', {
		//TODO: this will be the path for the readonly version
		//path: '/deck/:username/:deckname',
		path: '/builder/:_id',
		waitOn: function() {
			return [
				Meteor.subscribe('Decks', this.params._id),
				Meteor.subscribe('Sets', 'THS'),
			];
		},
		onAfterRun: function() {
			Session.set("route", "builder");
			document.title = "MTG Drafter - Deck Builder";
		},
		data: function() {
			//TODO: currentDecks should be phased out at some point...
			currentDeck = Decks.findOne({_id: this.params._id});
			//TODO: do i actually need this? where? why?>
			_deckname = currentDeck.name;

			//get basic lands
			basic_lands = {};
			var m14 = Sets.findOne({name: 'THS'});
			for(var i=0; i!=m14.cards.length; ++i)
				if(is_basic_land(m14.cards[i]))
					basic_lands[m14.cards[i].name] = m14.cards[i];
			//
			
			if(currentDeck.owner != Meteor.user().username)
			{
				alert("This isn't your deck! Go to readonly mode!");
				Router.go("/deck/"+currentDeck.owner+"/"+currentDeck.name);
			}
			document.title = "MTG Drafter - " + currentDeck.name;

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

			//Deck info
			var deck_info = {};
			deck_info.lands = {Forest: 0, Plains: 0, Mountain: 0, Island: 0, Swamp: 0};
			for(var i=0; i!=currentDeck.mainboard.length; ++i)
				if(is_basic_land(currentDeck.mainboard[i]))
					++deck_info.lands[currentDeck.mainboard[i].name];

			Session.setDefault("category", "none");

			return {
				deck: currentDeck,
				deck_info: deck_info,
				category: function() { return Session.get('category'); },
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
		"change #deckname": function(event) {
			var $this = event.target || event.srcElement;
			currentDeck.name = $($this).val();
			Decks.update(currentDeck._id, currentDeck);
		},
		"click .addland": function(event) {
			var $this = event.target || event.srcElement;
			currentDeck.mainboard.push(basic_lands[$($this).parent().data('landname')]);
			Decks.update(currentDeck._id, currentDeck);
		},
		"click .removeland": function(event) {
			var $this = event.target || event.srcElement;
			var mainboard = currentDeck.mainboard;
			for(var i=0; i!= mainboard.length; ++i)
				if(mainboard[i].name == $($this).parent().data('landname'))
				{
					mainboard.splice(i, 1);
					break;
				}

			Decks.update(currentDeck._id, currentDeck);
		},
		"change [name=categoryRadios]": function(event) {
			var $this = event.target || event.srcElement;
			
			Session.set('category', $this.value);
		},
		"click #clonedeck": function(event) {
			Meteor.call("clonedeck", currentDeck._id, function(err, res) {
				console.log("done meteor.method 'clonedeck'");
				console.log(err);
				console.log(res);
				Router.go(res);
			});
		},
	});


function is_basic_land(card)
{
	return card.name == "Forest"
		|| card.name == "Island"
		|| card.name == "Mountain"
		|| card.name == "Swamp"
		|| card.name == "Plains";
}
