labelBranchCount = 0;
Handlebars.registerHelper('labelBranch', function (label, options) {
	var data = this;
	return Spark.labelBranch(label + ++labelBranchCount, function() {
		return options.fn(data);
	});
});
