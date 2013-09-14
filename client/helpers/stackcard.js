stackcard = function(card, boardSelector) {
	var instances = $(boardSelector).find("."+card.id);
	instances.each(function(i, el) {
		if(i == 0)
			$(this).show();
		else
			$(this).hide();
	});
	//show the total # of cards at the top.
	$(instances.get(0)).find(".instanceCount").text(instances.length + " Total");
};
