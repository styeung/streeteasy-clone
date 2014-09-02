StreetEasyClone.Views.PropertyList = Backbone.View.extend({
	template: JST["templates/property_list"],
	
	initialize: function() {
		
	},

	render: function() {
		var that = this;
		var content = this.template({properties: this.collection, count: StreetEasyClone.totalCount, currentPage: this.getCurrentPage()});
		this.$el.html(content);

		this.collection.each(function(property) {
			var subView = new StreetEasyClone.Views.PropertyRow({model: property});
			that.$(".property-list").append(subView.render().$el);
		});
		
		return this;
	},
	
	getCurrentPage: function() {
		var fullUrl = window.location.href;
		var pageParamStart = fullUrl.indexOf("page=");
		
		if (pageParamStart !== -1) {
			var pageNumberStart = pageParamStart + 5;
			var nextParamStart = fullUrl.slice(pageNumberStart).indexOf("&")
			if(nextParamStart === -1) {
				var pageNumberEnd = fullUrl.length;
			}
			else {
				var pageNumberEnd = nextParamStart; 
			}
			
			return parseInt(fullUrl.slice(pageNumberStart, pageNumberEnd));
		}
		else {
			return 1;
		}
	}
});