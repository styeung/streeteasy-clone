StreetEasyClone.Views.CommentsList = Backbone.View.extend({
	template: JST["templates/comments_list"],
	
	initialize: function (options) {
	},
	
	render: function() {
		var that = this;
			
		var content = this.template({properties: this.collection});
		this.$el.html(content);
		this.collection.sort();
		
		this.collection.each(function(comment) {
			var rowView = new StreetEasyClone.Views.CommentRow({model: comment});
			that.$(".comments-list").append(rowView.render().$el);
		});
		
		var newView = new StreetEasyClone.Views.CommentNew({collection: this.collection});
		this.$(".new-comment-container").html(newView.render().$el);
		
		return this;
	}
})