StreetEasyClone.Views.PropertyIndex = Backbone.View.extend({
	template: JST["templates/index"],
	
	events: {
		"click .view-switch": "switchView"
	},
	
	initialize: function() {
		var content = this.template({properties: this.collection});
		this.$el.html(content);
	},
	
	render: function() {
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
	}
});