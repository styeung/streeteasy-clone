StreetEasyClone.Collections.AlbumPhotos = Backbone.Collection.extend({
	model: StreetEasyClone.Models.AlbumPhoto,
	
	initialize: function(options) {
		this.property = options.property;
	},
	
	url: this.property.url() + "/album_photos"
})