StreetEasyClone.Views.PropertyShow = Backbone.View.extend({
	template: JST['templates/property_show'],
	
	render: function() {
		var content = this.template({property: this.model});
		
		this.$el.html(content);
		
		return this;
	}
});