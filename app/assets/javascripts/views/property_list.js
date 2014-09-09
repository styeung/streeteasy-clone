StreetEasyClone.Views.PropertyList = Backbone.View.extend({
	template: JST["templates/property_list"],
	
	initialize: function(options) {
		if(options.savedPage) {
			this.savedPage = options.savedPage;
		}
		else if(!StreetEasyClone.searchQuery) {
			StreetEasyClone.searchQuery = this.getQueryString();
		}
		
		this.indexView = options.indexView;
		// this.listenTo(this.collection, "remove", this.render);
	},

	render: function() {
		var that = this;
		
		var content = this.template({properties: this.collection, count: StreetEasyClone.totalCount, currentPage: this.getCurrentPage(), savedPage: this.savedPage});
		this.$el.html(content);

		this.collection.each(function(property) {
			var subView = new StreetEasyClone.Views.PropertyRow({collection: that.collection, model: property, savedPage: that.savedPage, indexView: that.indexView });
			that.$(".property-list").append(subView.render().$el);
		});
		
		return this;
	},
	
	getCurrentPage: function() {	
		var fullUrl = StreetEasyClone.currentPageUrl;
		
		var pageParamStart = fullUrl.indexOf("page=");
		
		if (pageParamStart !== -1) {
			var pageNumberStart = pageParamStart + 5;
			var nextParamStart = fullUrl.slice(pageNumberStart).indexOf("&");
			
			if(nextParamStart === -1) {
				var pageNumberEnd = fullUrl.length;
			}
			else {
				var pageNumberEnd = nextParamStart; 
			}
			
			return parseInt(fullUrl.slice(pageNumberStart, pageNumberEnd));
		}
		else {
			if (this.savedPage) {
				return false;
			}
			else {
				return 1;
			}
		}
	},
	
	getQueryString: function () {
		var fullUrl = window.location.href;
		var queryParamStart = fullUrl.indexOf("#properties/");
		var queryStringStart = queryParamStart + 12;
		var pageParamStart = fullUrl.indexOf("&page=");
		
		if(pageParamStart !== -1) {
			var queryStringEnd = pageParamStart;
		}
		else {
			var queryStringEnd = fullUrl.length;
		}
		
		return fullUrl.slice(queryStringStart, queryStringEnd);
	}
});