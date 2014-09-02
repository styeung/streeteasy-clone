StreetEasyClone.Models.Property = Backbone.Model.extend({
	urlRoot: "/api/properties",
	
	parse: function(response) {
		if (response.current_user) {
			StreetEasyClone.currentUser = response.current_user;
			delete response.current_user
		}
		return response;
	}
});