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
	// boroughs: {
// 			    "manhattan": "Manhattan",
// 			    "brooklyn": "Brooklyn",
// 			    "queens": "Queens",
// 			    "bronx": "The Bronx",
// 			    "staten_island": "Staten Island"
//   },

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
	
	stat_attributes: ["sq_ft", "beds", "baths"]
};
