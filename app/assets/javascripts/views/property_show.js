StreetEasyClone.Views.PropertyShow = Backbone.View.extend({
	template: JST['templates/property_show'],
	
	initialize: function () {
		
	},
	
	render: function() {
		var property = this.model
		var content = this.template({property: property});
		
		this.$el.html(content);
		
		var albumPhotosView = new StreetEasyClone.Views.AlbumPhotosView({ collection: property.album_photos(), main_photo_url: property.escape("property_photo_url") });
		this.$(".photos-container").html(albumPhotosView.render().$el);

		var commentsListView = new StreetEasyClone.Views.CommentsList({ collection: property.comments() });
		this.$(".comments-list-container").html(commentsListView.render().$el);
		
		return this;
	}
});