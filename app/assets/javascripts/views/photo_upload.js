StreetEasyClone.Views.PhotoUpload = Backbone.View.extend({
	template: JST["templates/photo_upload"],
	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
});