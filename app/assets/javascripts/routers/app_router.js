StreetEasyClone.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "search",
		"search": "search",
		"properties/:query": "propertyIndex",
		"property/:id": "propertyShow"
	},
	
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		this.boroughs = options.boroughs;
		this.detailed_attributes = options.detailed_attributes;
		this.properties = options.properties;
	},
	
	search: function() {
		var view = new StreetEasyClone.Views.Search({boroughs: StreetEasyClone.boroughs});
		this.$rootEl.html(view.render().$el);
	},
	
	propertyIndex: function(query) {
		var that = this;
		this.properties.fetch({
			data: query,
			success: function(resp) {
				var view = new StreetEasyClone.Views.PropertyIndex({collection: that.properties});
				that.$rootEl.html(view.render().$el);
			}
		});
	},
	
	propertyShow: function(id) {
		var that = this;
		var model = new StreetEasyClone.Models.Property({id: id});
		model.fetch({
			success: function(model, resp) {
				console.log(model);
				var view = new StreetEasyClone.Views.PropertyShow({model: model});
				that.$rootEl.html(view.render().$el);
			}
		});
	}
});