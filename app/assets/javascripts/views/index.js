StreetEasyClone.Views.PropertyList = Backbone.View.extend({
	template: JST["templates/index"],
	render: function() {
		var content = this.template({properties: this.collection});
		this.$el.html(content);
		return this;
	}
});