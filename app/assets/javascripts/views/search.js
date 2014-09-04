StreetEasyClone.Views.Search = Backbone.View.extend({
	template: JST["templates/search"],
	
	initialize: function(options) {
		this.boroughs = options.boroughs;
	},
	
	events: {
		"submit .search-form": "submitSearch",
	},
	
	render: function() {
		var content = this.template({boroughs: this.boroughs});
		this.$el.html(content);
		return this;
	},
	
	submitSearch: function(event) {
		event.preventDefault();
		var formData = $(event.currentTarget).serialize();
		StreetEasyClone.searchQuery = $(event.currentTarget).serializeJSON();

		StreetEasyClone.router.navigate("properties/" + formData, {trigger: true});
	}
});