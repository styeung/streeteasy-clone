StreetEasyClone.Views.AlbumPhotosView = Backbone.View.extend({
	template: JST["templates/album_photos_view"],
	
	initialize: function (options) {
		this.main_photo_url = options.main_photo_url;
	},
	
	events: {
		"click .thumbnail": "switchPhoto"
	},
	
	render: function (options) {
		var content = this.template({album_photos: this.collection, main_photo_url: this.main_photo_url});
		this.$el.html(content);
		return this;
	},
	
	switchPhoto: function(event) {
		$(".thumbnail-container li").removeClass("active")
		$(event.currentTarget).parent().toggleClass("active");
		$(".displayed_image").attr("src", $(event.currentTarget).attr("src"));
	}
})