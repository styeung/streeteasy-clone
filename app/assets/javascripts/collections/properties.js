StreetEasyClone.Collections.Properties = Backbone.Collection.extend({
	url: "/api/properties",
	model: StreetEasyClone.Models.Property,
	
	// comparator: function() {
	// 	return -"price";
	// },
	
	comparator: function(model1, model2) {
		if (model1.escape("price") === "") {
			return 1;
		}
		else if (model2.escape("price") === "") {
			return -1;
		}
		else {
			return parseInt(model1.escape("price")) > parseInt(model2.escape("price")) ? -1 : 1;
		}
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