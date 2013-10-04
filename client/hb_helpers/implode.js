Handlebars.registerHelper('implode', function(arr, del) {
	var str = "";

	for(var i=0; i != arr.length; ++i)
		str += arr[i] + del;
	
	return str.substring(0, str.length - del.length);
});
