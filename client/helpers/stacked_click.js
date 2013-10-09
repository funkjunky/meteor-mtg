stacked_click = function(event) {
	var $this = event.srcElement;
	if($($this).prop('checked'))
	{
		for(var i = 0; i != currentDeck.mainboard.length; ++i)
			stackcard(currentDeck.mainboard[i], "#visualMainBoard");
		for(var i = 0; i != currentDeck.sideboard.length; ++i)
			stackcard(currentDeck.sideboard[i], "#visualSideBoard");
		for(var i = 0; i != currentDeck.pool.length; ++i)
			stackcard(currentDeck.pool[i], "#visualPoolBoard");
	} else {
		$(".cardchoice").show();
		$(".instanceCount").text("");
	}
};
