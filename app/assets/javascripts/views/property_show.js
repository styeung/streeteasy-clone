StreetEasyClone.Views.PropertyShow = Backbone.View.extend({
	template: JST['templates/property_show'],
	
	initialize: function () {
		this.listenTo(this.model.comments(), "sync", this.renderComments);
		
		this.listenToOnce(this.model, "sync", this.render);
	},
	
	events: {
		"click .save-button": "saveListing"
	},
	
	render: function() {
		var property = this.model;

		var content = this.template({property: property});
		this.$el.html(content);
		
		var albumPhotosView = new StreetEasyClone.Views.AlbumPhotosView({ collection: property.album_photos(), main_photo_url: property.escape("property_photo_url") });
		this.$(".photos-container").html(albumPhotosView.render().$el);
		
		this.renderComments();
		
		return this;
	},
	
	saveListing: function(event) {
		var that = this;
		$(event.currentTarget).prop("disabled", true);
		
		this.model.save({"following_user_id": StreetEasyClone.currentUser}, {
			patch: true,
			success: function(model, response) {

			}
		});
	},
	
	renderComments: function() {
		var commentsListView = new StreetEasyClone.Views.CommentsList({ collection: this.model.comments() });
		this.$(".comments-container").html(commentsListView.render().$el);
	}
});