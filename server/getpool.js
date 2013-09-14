getpool = function(sets) {
	var cards = [];
	for(var i=0; i!=sets.length; ++i)
		cards = cards.concat(getpack(sets[i]));
	return cards;
};
