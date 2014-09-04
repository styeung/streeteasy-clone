StreetEasyClone.Views.CommentsList = Backbone.View.extend({
	template: JST["templates/comments_list"],
	
	initialize: function (options) {
		this.listenTo(this.collection, "add remove", this.render);
	},
	
	render: function() {
		var that = this;
		
		var content = this.template();
		this.$el.html(content);
		
		var newView = new StreetEasyClone.Views.CommentNew({collection: this.collection});
		this.$(".new-comment-container").html(newView.render().$el);
		
		this.collection.each(function(comment) {
			var rowView = new StreetEasyClone.Views.CommentRow({model: comment});
			that.$(".comments-list").prepend(rowView.render().$el);
		});
		
		return this;
	}
})