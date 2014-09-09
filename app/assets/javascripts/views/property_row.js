StreetEasyClone.Views.PropertyRow = Backbone.View.extend({
	template: JST["templates/property_row"],
	
	initialize: function(options) {
		this.savedPage = options.savedPage;
		this.collection = options.collection;
		this.indexView = options.indexView;
	},
	
	tagName: "li",
	
	events: {
		"click .save-button": "saveListing",
		"click .delete-button": "deletePropertySave"
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
			url: "api/properties/remove_saved",
			type: "POST",
			data: "property_id=" + this.model.id,
			success: function() {
				that.collection.remove(that.model);
				StreetEasyClone.totalCount = that.collection.length;
				that.indexView.render();
			}
		})
	}
});