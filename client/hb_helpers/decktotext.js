Handlebars.registerHelper('deckToText', function(board) {
	var cardtally = {};

	if(!board)
		return "";

	for(var i = 0; i != board.length; ++i)
	{
		if(cardtally[board[i].name])
			++cardtally[board[i].name];
		else
			cardtally[board[i].name] = 1;
	}

	var str = "";
	for(var key in cardtally)
		str += cardtally[key] + "x " + key + "\n";
	return str;
});
