StreetEasyClone.Views.SignIn = Backbone.View.extend({
	template: JST["templates/sign_in"],

	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this;
	}
}); 