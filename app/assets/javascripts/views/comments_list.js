StreetEasyClone.Views.CommentsList = Backbone.View.extend({
	template: JST["templates/comments_list"],
	
	tagName: "ul",
	
	className: "comments-list",
	
	initialize: function (options) {
		this.listenTo(this.collection, "add remove", this.render);
	},
	
	render: function() {
		//put comments_new subview in here so we can use listeners for collection change
		
		this.collection.each(function(comment) {
			var rowView = new StreetEasyClone.Views.CommentRow({model: comment});
			this.$el.append(row.render().$el);
		});
	}
})