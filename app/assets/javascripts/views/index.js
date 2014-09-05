StreetEasyClone.Views.PropertyIndex = Backbone.View.extend({
	template: JST["templates/index"],
	
	events: {
		"click .view-switch": "switchView",
		"submit form": "sort"
	},
	
	children: [],
		
	initialize: function() {
		var content = this.template({properties: this.collection, count: StreetEasyClone.totalCount});
		this.$el.html(content);
		
		this.listenTo(this.collection, "sort sync", this.render)
	},
	
	render: function() {
		// var content = this.template({properties: this.collection, sortCriterion: this.sortCriterion, count: this.collection.first().escape("total_count")});
// 		this.$el.html(content);
		
		var activeButton = this.$(".view-switch.active").html();
		if(activeButton === "LIST") {
			var subView = new StreetEasyClone.Views.PropertyList({collection: this.collection});
			
		}
		else if (activeButton === "MAP") {
			var subView = new StreetEasyClone.Views.PropertyMap({collection: this.collection});
		}
		
		this.$(".view-container").html(subView.render().$el);
		return this;
		
	},
	
	switchView: function(event) {
		if(!$(event.currentTarget).hasClass("active")) {
			$(".view-switch-container").find(".view-switch").toggleClass("active");
			this.render();
		}
	},
	
	sort: function(event) {
		event.preventDefault();
		if(StreetEasyClone.totalCount <= 12) {
			this.sortOnePage(event);
		}
		else {
			var formData = $(event.currentTarget).serializeJSON();
			var currentQueryString = StreetEasyClone.searchQuery;
			
			if (formData["sort-criterion"] === "Most Expensive") {
				StreetEasyClone.sortString = "sort=price+desc";				
			}
			else if (formData["sort-criterion"] === "Least Expensive") {
				StreetEasyClone.sortString = "sort=price+asc";				
			}
			if (formData["sort-criterion"] === "Largest") {
				StreetEasyClone.sortString = "sort=sq_ft+desc";
			}
			else if (formData["sort-criterion"] === "Smallest") {
				StreetEasyClone.sortString = "sort=sq_ft+asc";				
			}
			else if (formData["sort-criterion"] === "Most Bedrooms") {
				StreetEasyClone.sortString = "sort=beds+desc";				
			}
			else if (formData["sort-criterion"] === "Least Bedrooms") {
				StreetEasyClone.sortString = "sort=beds+asc";				
			}
			
			var queryWithSort = currentQueryString + "&" + StreetEasyClone.sortString;
			this.collection.fetch({
				data: queryWithSort,
				success: function(resp) {
				}
			});
		}
		
	},
	
	sortOnePage: function(event) {
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		if (formData["sort-criterion"] === "Most Expensive") {
			StreetEasyClone.sortString = "sort=price+desc";
			this.collection.comparatorHelper("price", true);
		}
		else if (formData["sort-criterion"] === "Least Expensive") {
			StreetEasyClone.sortString = "sort=price+asc";	
			this.collection.comparatorHelper("price");
		}
		else if (formData["sort-criterion"] === "Largest") {
			StreetEasyClone.sortString = "sort=sq_ft+desc";
			this.collection.comparatorHelper("sq_ft", true);
		}
		else if (formData["sort-criterion"] === "Smallest") {
			StreetEasyClone.sortString = "sort=sq_ft+asc";	
			this.collection.comparatorHelper("sq_ft");
		}
		else if (formData["sort-criterion"] === "Most Bedrooms") {
			StreetEasyClone.sortString = "sort=beds+desc";
			this.collection.comparatorHelper("beds", true);
		}
		else if (formData["sort-criterion"] === "Least Bedrooms") {
			StreetEasyClone.sortString = "sort=beds+asc";
			this.collection.comparatorHelper("beds");
		}
		this.collection.sort();
	}
});

