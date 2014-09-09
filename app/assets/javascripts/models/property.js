StreetEasyClone.Models.Property = Backbone.Model.extend({
	urlRoot: "/api/properties",
	
	parse: function(response) {
		
		if (response.current_user) {
			StreetEasyClone.currentUser = response.current_user;
			delete response.current_user
		}
		
		if (response.album_photos) {
			this.album_photos().set(response.album_photos);
			delete response.album_photos;
		}
		
		if (response.comments) {
			this.comments().set(response.comments);
			delete response.comments;
		}
		
		if (response.subway_stations) {
			this.subway_stations = response.subway_stations;
			delete response.subway_stations
		}
		
		return response;
	},
	
	album_photos: function() {
		if(!this._album_photos) {
			this._album_photos = new StreetEasyClone.Collections.AlbumPhotos([], {
				property: this
			});
		}

		return this._album_photos
	},
	
	comments: function () {
		if(!this._comments) {
			this._comments = new StreetEasyClone.Collections.Comments([], {
				property: this
			});
		}
				
		return this._comments;
	}
});