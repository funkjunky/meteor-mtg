Meteor.methods({
	create_sealed_deck: function(sets) {
		//create the sealed deck, save it as sealed-day_month_year-set-set-...-timestamp
		var pool = getpool(sets);
		var date = new Date();
		var name = "sealed_" + implode(sets, "-") + "_" + date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
		var name_count;
		if((name_count = Decks.find({name: new RegExp(name)}).count()) > 0)
			name += "_" + (name_count+1);

		console.log("creating sealed deck, name: " + name);
		//TODO: all deck creation should be in one place, so I don't duplicate things like logging.
		var deck__id = Decks.insert({
			name: name,
			owner: Meteor.user().username,
			mainboard: [],
			sideboard: [],
			pool: pool,
			sealed: true
		});

		Logs.insert({
			id: "builder-"+Meteor.user().username+"-"+name,
			deckname: name,
			changes: [],
			timestamp: Date.now(),
		});

		return {_id: deck__id};
	},
});

function implode(array, del)
{
	if(array.length === 0) return "";
	var str = "";
	for(var i=0; i!=array.length; ++i)
		str += array[i] + del;

	return str.substr(0, str.length - del.length);
}
