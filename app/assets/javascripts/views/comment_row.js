StreetEasyClone.Views.CommentRow = Backbone.View.extend({
	template: JST["templates/comment_row"],
	
	tagName: "li",
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"click .delete-comment": "deleteComment"
	},
	
	className: "comment-row",
	
	render: function() {
		var content = this.template({comment: this.model});
		this.$el.html(content);
		return this;
	},
	
	deleteComment: function() {
		this.model.destroy();
	}
});