Meteor.methods({
	create_draft: function(sets, numberOfSeats, timer_disabled) {
		var id = Date.now();
		var players = [Meteor.user().username];
		var packs = sets;
		var date = new Date();
		var name = "_draft-" + date.getDate() + "_" + (date.getMonth()+1) + "_" + date.getFullYear() + "_" + implode(sets, "-") + "_" + Date.now();


		console.log("creating draft, id: " + id);

		//Create the draft
		Drafts.insert({
			id: id,
			timestamp: Date.now(),
			status: "lobby",
			players: players,
			ready: [],
			warning: [],
			quickpick: [],
			withbots: false,
			timer_disabled: timer_disabled,
			numberOfSeats: numberOfSeats,
			packs: packs,
			openpack: 0,
		});

		//new log
		Logs.insert({
			id: "draft-"+id,
			timestamp: Date.now(),
			updates: [],
		});

		return {
			draftid: id,
		};
	},
});

function implode(array, del)
{
	if(array.length === 0) return "";
	var str = "";
	for(var i=0; i!=array.length; ++i)
		str += array[i] + del;

	return str.substr(0, str.length - del.length);
}
