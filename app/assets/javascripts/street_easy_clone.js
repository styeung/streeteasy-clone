
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
			boroughs: {
			    "manhattan": "Manhattan",
			    "brooklyn": "Brooklyn",
			    "queens": "Queens",
			    "bronx": "The Bronx",
			    "staten_island": "Staten Island"
		  },
			detailed_attributes: ["zip", "price", "beds", "baths", "sq_ft", "apt_type", "borough"]
		});

		Backbone.history.start();
// 		collection.fetch({
// 			success: function(resp) {
// 				StreetEasyClone.router = new StreetEasyClone.Routers.AppRouter({
// 					$rootEl: $(".main"),
// 					properties: collection,
// 					boroughs: {
// 					    "manhattan": "Manhattan",
// 					    "brooklyn": "Brooklyn",
// 					    "queens": "Queens",
// 					    "bronx": "The Bronx",
// 					    "staten_island": "Staten Island"
// 				  },
// 					detailed_attributes: ["zip", "price", "beds", "baths", "sq_ft", "apt_type", "borough"]
// 				});
//
// 				Backbone.history.start();
// 			}
// 		});
  }
};

$(document).ready(function(){
  // StreetEasyClone.initialize();
});
