StreetEasyClone.Views.PropertyShow = Backbone.View.extend({
	template: JST['templates/property_show'],
	
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"click .save-button": "saveListing"
	},
	
	render: function() {
		var property = this.model
		var content = this.template({property: property});
		
		this.$el.html(content);
		
		var albumPhotosView = new StreetEasyClone.Views.AlbumPhotosView({ collection: property.album_photos(), main_photo_url: property.escape("property_photo_url") });
		this.$(".photos-container").html(albumPhotosView.render().$el);

		var commentsListView = new StreetEasyClone.Views.CommentsList({ collection: property.comments() });
		this.$(".comments-container").html(commentsListView.render().$el);
		
		return this;
	},
	
	saveListing: function(event) {
		var that = this;
		this.model.save({"following_user_id": StreetEasyClone.currentUser}, {
			patch: true,
			success: function(model, response) {
				$(event.currentTarget).attr("class", "already-saved-button");
				$(event.currentTarget).prop("disabled", true);
			}
		});
	}
});