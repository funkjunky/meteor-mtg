Handlebars.registerHelper('yx_table', function(obj, options) {
	var str = "<table>\n";
	var rows = [];

	str += "<thead>\n<tr>\n";
	for(var key in obj)
	{
		str += "<th>" + key + "</th>\n";
		for(var i=0; i!=obj[key].length; ++i)
			if(!rows[i])
				rows[i] = {key: obj[key][i]};
			else
				rows[i][key] = obj[key][i];
	}
	str += "</tr>\n</thead>\n";

	str += "<tbody>\n";
	for(var i=0; i!=rows.length; ++i)
	{
		str += "<tr>\n";
		for(var key in rows[i])
			str += "<td>" + rows[i][key] + "</td>";
		str += "</tr>\n";
	}
	str += "</tbody>\n";

	str += "</table>";
	return new Handlebars.SafeString(str);
});
