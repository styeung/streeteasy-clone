StreetEasyClone.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "search",
		"properties/:query": "propertyIndex",
	},
	
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		this.boroughs = options.boroughs;
		this.detailed_attributes = options.detailed_attributes;
		this.properties = options.properties;
	},
	
	search: function() {
		var view = new StreetEasyClone.Views.Search({boroughs: this.boroughs});
		this.$rootEl.html(view.render().$el);
	},
	
	propertyIndex: function(query) {
		var that = this;
		console.log(query);
		this.properties.fetch({
			data: query,
			success: function(resp) {
				console.log(that.properties);
				var view = new StreetEasyClone.Views.PropertyList({collection: that.properties});
				that.$rootEl.html(view.render().$el);
			}
		});
		
		// var view = new StreetEasyClone.Views.PropertyList({query: query});
		// this.$rootEl.html(view.render().$el);
		
	}
});