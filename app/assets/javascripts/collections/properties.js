StreetEasyClone.Collections.Properties = Backbone.Collection.extend({
	url: "/api/properties",
	model: StreetEasyClone.Models.Property,
	
	parse: function(response) {
		if (response.length > 0) {
			StreetEasyClone.totalCount = response[0].total_count;
			StreetEasyClone.currentUser = response[0].current_user;
			for(var i = 0; i < response.length; i++) {
				delete response[i].total_count;
				delete response[i].current_user;
			}
		}
		else {
			StreetEasyClone.totalCount = 0;
		}
		return response;
	},
	
	comparatorHelper: function(attribute, inverse) {
		if(inverse ===  true){
			this.comparator = function(model1, model2) {
				if (model1.escape(attribute) === "") {
					return 1;
				}
				else if (model2.escape(attribute) === "") {
					return -1;
				}
				else {
					return parseInt(model1.escape(attribute)) > parseInt(model2.escape(attribute)) ? -1 : 1;
				}
			}
		}
		else {
			this.comparator = function(model1, model2) {
				if (model1.escape(attribute) === "") {
					return 1;
				}
				else if (model2.escape(attribute) === "") {
					return -1;
				}
				else {
					return parseInt(model1.escape(attribute)) < parseInt(model2.escape(attribute)) ? -1 : 1;
				}
			}
		}
	}
});