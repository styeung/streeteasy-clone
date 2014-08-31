
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
	boroughs: {
			    "manhattan": "Manhattan",
			    "brooklyn": "Brooklyn",
			    "queens": "Queens",
			    "bronx": "The Bronx",
			    "staten_island": "Staten Island"
  },
	detailed_attributes: ["zip", "price", "beds", "baths", "sq_ft", "apt_type", "borough"]
};

$(document).ready(function(){
	$.ajax("api/auth/check_current_user", {
		type: "GET",
		success: function(resp) {
			if(isNaN(resp.id)){
				StreetEasyClone.currentUser = false;
				StreetEasyClone.initialize();
			}
			else {
				StreetEasyClone.currentUser = resp.id
				StreetEasyClone.initialize();
			}
		}
	});
});