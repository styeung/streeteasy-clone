StreetEasyClone.Views.Search = Backbone.View.extend({
	template: JST["templates/search"],
	
	initialize: function(options) {
		this.boroughs = options.boroughs;
		this.$rootEl = options.$rootEl;
		this.properties = options.properties
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
		var that = this;
		event.preventDefault();
		var formData = $(event.currentTarget).serialize();
		StreetEasyClone.searchQuery = formData;
		StreetEasyClone.searchQueryJSON = $(event.currentTarget).serializeJSON();
		StreetEasyClone.sortString = "sort=price+desc";
		StreetEasyClone.router.navigate("properties/" + formData, {trigger: true});
	}
});