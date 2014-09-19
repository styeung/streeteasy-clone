StreetEasyClone.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "search",
		"search": "search",
		"properties/saved": "savedProperties",
		"properties/:query": "propertiesIndex",
		"property/new": "propertyNew",
		"property/edit/:id": "propertyEdit",
		"property/:id": "propertyShow",
	},
	
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		this.boroughs = options.boroughs;
		this.detailed_attributes = options.detailed_attributes;
		this.properties = options.properties;
	},
	
	search: function() {
		var view = new StreetEasyClone.Views.Search({boroughs: StreetEasyClone.boroughs, $rootEl: this.$rootEl, properties: this.properties });
		this.$rootEl.html(view.render().$el);
		window.scrollTo(0, 0);
	},
	
	savedProperties: function() {
		StreetEasyClone.currentPageUrl = window.location.href;
		var that = this;
		this.properties.fetch({
			data: "saved=true",
			success: function(resp) {
				var view = new StreetEasyClone.Views.PropertyIndex({collection: that.properties, savedPage: true});
				that.$rootEl.html(view.render().$el);
				window.scrollTo(0,0);
			}
		});
	},
	
	propertiesIndex: function(query) {
		StreetEasyClone.currentPageUrl = window.location.href;
		var that = this;
		if(!StreetEasyClone.sortString) {
			StreetEasyClone.sortString = "sort=price+desc";
		}
		this.properties.fetch({
			data: query + "&" + StreetEasyClone.sortString,
			success: function(resp) {
				var view = new StreetEasyClone.Views.PropertyIndex({collection: that.properties});
				that.$rootEl.html(view.render().$el);
				window.scrollTo(0, 0);
			}
		});
	},
	
	propertyShow: function(id) {
		var that = this;
		
		if(this.properties.length < 1) {
			var model = new StreetEasyClone.Models.Property({id: id});
		}
		else {
			var model = this.properties.get(id);
		}
		
		model.fetch({
			success: function(model, resp) {

			}
		});
		
		var view = new StreetEasyClone.Views.PropertyShow({model: model});
		that.$rootEl.html(view.render().$el);
		window.scrollTo(0, 0);
	},
	
	propertyNew: function() {
		var model = new StreetEasyClone.Models.Property();
		var view = new StreetEasyClone.Views.PropertyNew({model: model});
		this.$rootEl.html(view.render().$el);
		window.scrollTo(0, 0);
	},
	
	propertyEdit: function(id) {
		var that = this;
		
		var model = new StreetEasyClone.Models.Property({id: id});

		model.fetch({
			success: function(model, resp) {
				var view = new StreetEasyClone.Views.PropertyEdit({model: model});
				that.$rootEl.html(view.render().$el);
				window.scrollTo(0, 0);
			}
		});
	}
});