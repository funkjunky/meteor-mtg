Handlebars.registerHelper('draftstats_table', function(arr, options) {
	var str = "<table>\n";
	var rows = [];

	str += "<thead>\n<tr>\n";
	for(var i=0; i!=arr.length; ++i)
	{
		str += "<th><a href='/builder/"+arr[i].deckid+"'>(Seat "+(arr[i].seat+1)+") " + arr[i].player + "</a></th>\n";
		for(var k=0; k!=arr[i].picks.length; ++k)
		{
			if(!rows[k])
				rows[k] = {};

			rows[k][arr[i].seat] = arr[i].picks[k];
		}
	}
	str += "</tr>\n</thead>\n";

	str += "<tbody>\n";
	for(var i=0; i!=rows.length; ++i)
	{
		str += "<tr>\n";
		for(var key in rows[i])
			str += "<td class='textcard'>" + rows[i][key] + "</td>";
		str += "</tr>\n";
	}
	str += "</tbody>\n";

	str += "</table>";
	return new Handlebars.SafeString(str);
});
