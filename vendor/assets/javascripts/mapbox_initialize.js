L.mapbox.accessToken = 'pk.eyJ1Ijoic2FpdG95ZXVuZyIsImEiOiJPOXA3aUowIn0.spWqAgo8-BgTGtYiLbOztg';
var map = L.mapbox.map('map', 'saitoyeung.jbj6oj44');
var geocoder = L.mapbox.geocoder('mapbox.places-v1');
var defaultLat = 40.714728;
var defaultLng = -73.998672;

map.setView([defaultLat, defaultLng], 12);

var address, borough, queryString, queryResult, lat, lng
$(document).ready( function() {
	//want default on first property on page
	$(".main").on("mouseenter", "li.property-listing", function(event) {
		lat = $(event.currentTarget).attr("data-lat");
		lng = $(event.currentTarget).attr("data-lng");
		
		if(lat && lng) {
			map.setView([lat, lng], 15);
			L.marker([lat, lng]).addTo(map);
		}
		else {
			map.setView([defaultLat, defaultLng], 12);
		}
	});
});