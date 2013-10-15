sortcolours = function(board) {
	//sorting by colours
	var colours = {W:[],B:[],G:[],R:[],U:[],A:[],L:[],MC:[]};
	for(var i=0; i!=board.length; ++i)
		if(board[i].color.length > 1)
			colours["MC"].push(board[i]);
		else
			colours[board[i].color].push(board[i]);

	var newpool = [];
	for(var k in colours)
		for(var i=0; i!=colours[k].length; ++i)
			newpool.push(colours[k][i]);

	return newpool;
};
