StreetEasyClone.Views.PropertyRow = Backbone.View.extend({
	template: JST["templates/property_row"],
	
	initialize: function(options) {
		this.savedPage = options.savedPage;
	},
	
	tagName: "li",
	
	events: {
		"click .save-button": "saveListing"
	},
	
	attributes: function() {
		return {
			"class": "property-listing",
			"data-lat": this.model.escape("latitude"),
			"data-lng": this.model.escape("longitude")
		}
	},
	
	render: function() {
		var content = this.template({property: this.model, savedPage: this.savedPage });
		this.$el.html(content);
		return this;
		
	},
	
	saveListing: function(event) {
		var that = this;
		// $(event.currentTarget).attr("class", "already-saved-button");
		$(event.currentTarget).prop("disabled", true);
		
		this.model.save({"following_user_id": StreetEasyClone.currentUser}, {
			patch: true,
			success: function(model, response) {

			},
			wait: true
		});
	},
	
	deletePropertySave: function(event) {
		var that = this;
		$.ajax({
			url: "/properties/removed_saved",
			type: "DELETE",
			data: "property_id=" + this.model.id,
			success: function() {
				console.log("deleted");
				that.collection.remove(that.model);
			}
		})
	}
});