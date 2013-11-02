draftSummaryRoute = function() {
	this.route('draftsummary', {
		path: '/draftsummary/:draftid',
		waitOn: function() {
			return [
				Meteor.subscribe('Drafts', parseInt(this.params.draftid)),
				Meteor.subscribe('Draftstats', parseInt(this.params.draftid)),
			];
		},
		onAfterRun: function() {
			Session.set('route', 'draftsummary');
			document.title= "MTG Drafter - Draft Summary";
		},
		data: function() {
			var draftstats = Draftstats.find({draftid: parseInt(this.params.draftid)}, {sort: {seat: 1}}).fetch();
			var keyed_stats = [];

			return {
				draft: Drafts.findOne({id: parseInt(this.params.draftid)}),
				draftstats: draftstats,
			};
		},
	});
};

Template.draftsummary.events({
	"mouseenter .textcard": function(event) {
		$this = event.target || event.srcElement;
		$($this).css("background-color", "yellow");
		var filename = "/magicimgs/THS/" + Handlebars._default_helpers.spacesToDashes($($this).text()) + ".jpg";
		$("#cardpreview").attr("src", filename);
		$("#cardpreview").show();
		$("#cardpreview").offset({left: $($this).offset().left + ($this.width/2), top: $($this).offset().top - $("#cardpreview").height()});
		$("#cardpreview").css({visible: "visible"});
	},
	"mouseleave .textcard": function(event) {
		$this = event.target || event.srcElement;
		if($("#cardpreview").attr("src").indexOf(Handlebars._default_helpers.spacesToDashes($($this).text())) != -1)
		{
			$("#cardpreview").hide();
			$($this).css("background-color", "white");
		}
	},
});
