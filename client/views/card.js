Template.card.events({
	"change .cardvisualtoggle": function(event) {
		var $this = event.srcElement;
		if($($this).prop('checked'))
		{
			$($this).parent().parent().find(".cardtext").hide();
			$($this).parent().parent().find(".cardimage").show();
		} else {
			$($this).parent().parent().find(".cardimage").hide();
			$($this).parent().parent().find(".cardtext").show();
		}
	},
});
