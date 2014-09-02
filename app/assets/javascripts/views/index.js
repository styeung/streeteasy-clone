StreetEasyClone.Views.PropertyIndex = Backbone.View.extend({
	template: JST["templates/index"],
	
	events: {
		"click .view-switch": "switchView",
		"submit form": "sort"
	},
	
	children: [],
	
	sortCriterion: "price_largest",
	
	initialize: function() {
		var content = this.template({properties: this.collection, sortCriterion: this.sortCriterion, count: StreetEasyClone.totalCount});
		this.$el.html(content);
		
		this.listenTo(this.collection, "sort", this.render)
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
			console.log("here")
			$(".view-switch-container").find(".view-switch").toggleClass("active");
			this.render();
		}
	},
	
	sort: function(event) {
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		if (formData["sort-criterion"] === "Largest") {
			this.sortCriterion = "sq_ft_largest"
			this.collection.comparatorHelper("sq_ft", true);
		}
		else if (formData["sort-criterion"] === "Smallest") {
			this.sortCriterion = "sq_ft_smallest"
			this.collection.comparatorHelper("sq_ft");
		}
		else if (formData["sort-criterion"] === "Most Expensive") {
			this.sortCriterion = "price_largest"
			this.collection.comparatorHelper("price", true);
		}
		else if (formData["sort-criterion"] === "Least Expensive") {
			this.sortCriterion = "price_smallest"
			this.collection.comparatorHelper("price");
		}
		else if (formData["sort-criterion"] === "Most Bedrooms") {
			this.sortCriterion = "beds_largest"
			this.collection.comparatorHelper("beds", true);
		}
		else if (formData["sort-criterion"] === "Least Bedrooms") {
			this.sortCriterion = "beds_smallest"
			this.collection.comparatorHelper("beds");
		}
		this.collection.sort();
	}
});