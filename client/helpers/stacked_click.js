stacked_click = function(event) {
	var $this = event.srcElement;
	if($($this).prop('checked'))
	{
		var boards = ["mainboard", "sideboard", "pool"];
		for(var k = 0; k != boards.length; ++k)
			for(var i = 0; i != currentDeck[boards[k]].length; ++i)
				stackcard(currentDeck[boards[k]][i], "#visual"+boards[k]);
	} else {
		$(".cardchoice").show();
		$(".instanceCount").text("");
	}
};
