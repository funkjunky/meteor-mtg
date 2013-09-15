computerpick = function(deck, pack)
{
	var scores = [];
	for(var i = 0; i != pack.cards.length; ++i)
	{
		var card = pack.cards[i];
		scores[i] = 1;
		
		//add score for rarity
		switch(card.rarity)
		{
			case 'U':	scores[i] += 2 + ((card.foil)?2:0); break;
			case 'R':	scores[i] += 4 * ((card.foil)?2:1); break;
			case 'M':	scores[i] += 8 * ((card.foil)?2:1); break;
		}

		//add 2 for colourless
		if(card.color == "A")
			scores[i] += 2;

		//add score for colour similarity
		for(var k = 0; k != deck.pool.length; ++k)
			if(deck.pool[k].color == card.color)
				++scores[i];
	}

	var max = 0; maxindex = -1;
	for(var i=0; i!=scores.length; ++i)
		if(scores[i] > max)
		{
			max = scores[i];
			maxindex = i;
		}

	return maxindex;
};
