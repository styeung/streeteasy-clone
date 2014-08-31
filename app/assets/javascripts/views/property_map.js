StreetEasyClone.Views.PropertyMap = Backbone.View.extend({
	template: JST["templates/property_map"],
	
	render: function() {
		var content = this.template({properties: this.collection});
		this.$el.html(content);
		
		return this;
	}
});