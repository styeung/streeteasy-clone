StreetEasyClone.Views.CommentNew = Backbone.View.extend({
	template: JST["templates/comment_new"],
	
	initialize: function (options) {
		
	},
	
	events: {
		"submit form": "createComment"
	},
	
	render: function() {
		console.log('here');
		var content = this.template();
		this.$el.html(content);
		console.log(this)
		return this;
	},
	
	createComment: function(event) {
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		this.collection.create(formData, {
			success: function(model, response, options) {
				$(event.currentTarget).empty();
				console.log("model saved", model);
			}
		});
	}
})