StreetEasyClone.Collections.Comments = Backbone.Collection.extend({
	model: StreetEasyClone.Models.Comment,
	
	initialize: function(models, options) {
		this.property = options.property
	},
	
	url: function() {
		return this.property.url() + "/comments";
	}
});