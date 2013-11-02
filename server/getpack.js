//I may need to susbcribe to the Sets collection in order to have this work on the client side.
getpack = function(set, random)
{
	var cards = [];
	var taken = {};
	var allowed_rarity = {
		"R": 1,
		"U": 3,
		"C": 10,
	};
	var cards_per_pack = 14;

	//get the cards in the set
	var set = Sets.findOne({name: set}).cards;

	//roll to seeif this pack contains a foil
	var has_foil = rand_int(65) == 0; //1:65
	var has_mythic = rand_int(8) == 0; //1:8

	//change the rare slot to a mythic slot
	if(has_mythic) {
		delete allowed_rarity['R'];
		allowed_rarity['M'] = 1;
	}
	//add a random card, regardless of rarity.
	if(has_foil) { //TODO: add a proprty to indicate the card is foil
		var foilcard = set[rand_int(set.length)];
		foilcard.foil = true;
		cards.push(foilcard); //add ANY card from the set
		--allowed_rarity['C'];
	}

	if(random)
		allowed_rarity = false; //indicates we don't care about rarity

	while(cards.length < cards_per_pack)
	{
		var random_card = set[rand_int(set.length)];

		if(random_card.type.substr(0,"Basic Land".length) != "Basic Land" && !taken[random_card.id] && (!allowed_rarity || --allowed_rarity[random_card.rarity] >= 0))
		{
			console.log(random_card.name);
			cards.push(random_card);
			taken[random_card.id] = true;
		}
	}
	//my method of sorting by rarity... i dont know why...
	var sorted = [];
	var rarities = ['M', 'R', 'U', 'C'];
	for(var i=0; i!=rarities.length; ++i)
		for(var k=0; k!=cards.length; ++k)
			if(cards[k].rarity == rarities[i])
				sorted.push(cards[k]);

	return sorted;
};

rand_int = function(max, min)
{
	var min = (min)?min:0;
	return min + Math.floor(Math.random() * (max - min));
}
