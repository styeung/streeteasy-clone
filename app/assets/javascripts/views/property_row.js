StreetEasyClone.Views.PropertyRow = Backbone.View.extend({
	template: JST["templates/property_row"],
	
	initialize: function() {

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
		var content = this.template({property: this.model});
		this.$el.html(content);
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