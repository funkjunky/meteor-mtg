Template.card.events({
	"change .cardvisualtoggle": function(event) {
		var $this = event.target || event.srcElement;
		if(!$($this).prop('checked'))
		{
			$($this).parent().parent().parent().find(".cardtext").hide();
			$($this).parent().parent().parent().find(".cardimage").show();
		} else {
			$($this).parent().parent().parent().find(".cardimage").hide();
			$($this).parent().parent().parent().find(".cardtext").show();
		}
	},
});
