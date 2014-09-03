StreetEasyClone.Models.Property = Backbone.Model.extend({
	urlRoot: "/api/properties",
	
	parse: function(response) {
		if (response.current_user) {
			StreetEasyClone.currentUser = response.current_user;
			delete response.current_user
		}
		else if (response.album_photos) {
			this.album_photos().set(response.album_photos);
			delete response.album_photos;
		}
		console.log(this.album_photos())
		return response;
	},
	
	album_photos: function() {
		if(!this._album_photos) {
			this._album_photos = new StreetEasyClone.Collections.AlbumPhotos([], {
				property: this
			});
		}

		return this._album_photos
	}
});