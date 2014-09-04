StreetEasyClone.Views.CommentRow = Backbone.View.extend({
	template: JST["templates/comment_row"],
	
	tagName: "li",
	
	events: {
		"click .delete-comment": "deleteComment"
	},
	
	className: "comment-row",
	
	render: function() {
		console.log("model", this.model)
		console.log("title", this.model.escape("title"));
		var content = this.template({comment: this.model});
		this.$el.html(content);
		return this;
	},
	
	deleteComment: function() {
		this.model.destroy();
	}
});