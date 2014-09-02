StreetEasyClone.Views.PropertyNew = Backbone.View.extend({
	template: JST["templates/property_new"],
	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
});