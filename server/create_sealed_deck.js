Meteor.methods({
	create_sealed_deck: function(sets) {
		//create the sealed deck, save it as sealed-day_month_year-set-set-...-timestamp
		var pool = getpool(sets);
		var date = new Date();
		var name = "_sealed-" + date.getDate() + "_" + (date.getMonth()+1) + "_" + date.getFullYear() + "_" + implode(sets, "-") + "_" + Date.now();

		console.log("creating sealed deck, name: " + name);
		Decks.insert({
			name: name,
			mainboard: [],
			sideboard: [],
			pool: pool,
			sealed: true
		});

		return {name: name};
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
