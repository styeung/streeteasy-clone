StreetEasyClone.Views.PropertyList = Backbone.View.extend({
	template: JST["templates/property_list"],
	
	initialize: function() {
		
	},

	render: function() {
		var that = this;
		var content = this.template({properties: this.collection});
		this.$el.html(content);

		this.collection.each(function(property) {
			var subView = new StreetEasyClone.Views.PropertyRow({model: property});
			that.$(".property-list").append(subView.render().$el);
		});
		
		return this;
	}
});