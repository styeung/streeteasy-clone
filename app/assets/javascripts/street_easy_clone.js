window.StreetEasyClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Hello from Backbone!');
		var collection = new StreetEasyClone.Collections.Properties();
		StreetEasyClone.router = new StreetEasyClone.Routers.AppRouter({
			$rootEl: $(".main"),
			properties: collection,
		});

		Backbone.history.start(); 
	},
	boroughs: [
		"Manhattan", 
		"Brooklyn", 
		"Queens", 
		"The Bronx", 
		"Staten Island"
	],

	bed_types: [
		"0",
		"1",
		"2",
		"3",
		"4"
	],
	
	bath_types: [
		"1",
		"1.5",
		"2",
		"2.5",
		"3",
		"3.5",
		"4"
	],
	
	detailed_attributes: ["zip", "price", "beds", "baths", "sq_ft", "apt_type", "borough", "description"],
	
	stat_attributes: ["sq_ft", "beds", "baths"],
	
	convertNumToCurrency: function(num) {
		if(num === 0) {
			return "$0";
		}
		else if (num < 1000000) {
			return "$" + String(num).split("").reverse().slice(3).reverse().join("") + "," +
			 String(num).split("").reverse().slice(0,3).reverse().join("");
		}
		else if (num < 1000000000) {
			return "$" + String(num).split("").reverse().slice(6).reverse().join("") + "," +
			String(num).split("").reverse().slice(3, 6).reverse().join("") + "," +
			 String(num).split("").reverse().slice(0,3).reverse().join("");
		}
	}
};
