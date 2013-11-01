Handlebars.registerHelper('sort_by_category', function(options) {
	var board = options.hash.board;
	var category = options.hash.category;
	console.log("category: " + category);
	if(!board || !category)
		return;

	//I have to add the _index no matter what @.@... TODO: fix this terribleness
	for(var i=0; i!=board.length; ++i)
		board[i]._index = i;

	var cat_cards = {};
	switch(category)
	{
		case "none":
			console.log('default order');
			//simply iterate through all cards and append them ;)
			var ret = "";
			for(var i=0; i!=board.length; ++i)
				ret += options.fn(board[i]);
			return ret;
		case "cardtype":
			console.log('by type');
			cat_cards = category_sort(board, function(card) {
				var messy_cats = card.type.split("—")[0].trim().split(" ");
				for(var i=0; i!=messy_cats.length; ++i)
					messy_cats[i].trim();

				return messy_cats;
			}, function(a, b) {
				if(a == "Creature")
					return -1;
				else if(b == "Creature")
					return 1;
				else
					return (a < b)?-1:1;
			});
			break;
		case "rarity":
			console.log('by rarity');
			cat_cards = category_sort(board, function(card) {
				switch(card.rarity)
				{
					case "M": return ["Mythic"];
					case "R": return ["Rare"];
					case "U": return ["Uncommon"];
					case "C": return ["Common"];
					default: return ["????"];
				}
			}, function(a, b) {
				console.log('sort');
				console.log(a);
				switch(a)
				{
					case "Mythic": return -1;
					case "Rare": return (b != "Mythic")?-1:1;
					case "Uncommon": return (b != "Mythic" && b != "Rare")?-1:1;
					case "Common": return 1;
				}
			});
			break;
		case "convertedmanacost":
			console.log('by mana');
			cat_cards = category_sort(board, function(card) {
				return [card.converted_manacost];
			}, function(a, b) {
				return a < b;
			});
			break;
		default:
			console.log('something broke in change switchcase');
	}

	var ret = "";
	for(var title in cat_cards)
	{
		ret += "<h2>"+title+"</h2>";
		for(var i=0; i!=cat_cards[title].length; ++i)
			ret += options.fn(cat_cards[title][i]);
	}

	return ret;
});

function category_sort(board, get_cat_fnc, sort)
{
	var categories = {};

	for(var i=0; i!=board.length; ++i)
	{
		var card_cats = get_cat_fnc(board[i]);
		for(var k=0; k!=card_cats.length; ++k)
		{
			if(categories[card_cats[k]])
				categories[card_cats[k]].push(board[i]);
			else
				categories[card_cats[k]] = [board[i]];
		}
	}

	//sorting
	var sortedcats = {};
	var cats = [];
	//first get all the categories
	for(var title in categories)
		cats.push(title);
	cats.sort(sort);	//sort the categories by our sorting aglorithm.

	//create our new sorted cateogies list.
	for(var i=0; i!=cats.length; ++i)
		sortedcats[cats[i]] = categories[cats[i]];

	console.log(sortedcats);
	return sortedcats;
}
