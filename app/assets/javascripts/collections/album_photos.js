StreetEasyClone.Collections.AlbumPhotos = Backbone.Collection.extend({
	model: StreetEasyClone.Models.AlbumPhoto,
	
	initialize: function(models, options) {
		console.log("options", options)
		this.property = options.property;
	},
	
	url: function() {
		console.log("this.property", this.property)
		return this.property.url() + "/album_photos"
	}
})