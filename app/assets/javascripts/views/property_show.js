StreetEasyClone.Views.PropertyShow = Backbone.View.extend({
	template: JST['templates/property_show'],
	
	render: function() {
		var property = this.model
		var content = this.template({property: property});
		
		this.$el.html(content);
		
		var commentSubView = new StreetEasyClone.Views.CommentNew({property: property});
		this.$(".new-comment-container").html(commentSubView.render().$el);
		
		var commentsListSubView = new StreetEasyClone.Views.CommentsList({collection: property.comments()});
		this.$(".comments-list-container").html(commentsListSubView.render().$el);
		
		return this;
	}
});