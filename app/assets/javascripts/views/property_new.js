StreetEasyClone.Views.PropertyNew = Backbone.View.extend({
	template: JST["templates/property_form"],
	
	events: {
		"click .add-more-photos-button": "addMorePhotos",
		"click .add-property-button": "createProperty",
		"change #main-photo-upload": "handleFiles",
		"submit .new-property-form": "preventDefaultFormSubmission",
		"click .main-photo-button": "uploadMainPhoto"
	},
	
	render: function() {
		var content = this.template({property: this.model, action: "new"});
		this.$el.html(content);
		return this;
	},
	
	handleFiles: function(event) {
		var that = this;
		var files = event.currentTarget.files;
		
		var preview = document.getElementById("main-photo-container");
		var oldChild = $(".current-image")[0];
		
		for(var i = 0; i < files.length; i++) {
			var file = files[i];
			var imageType = /image.*/;
		
			if(!file.type.match(imageType)) {
				continue;
			}
		
			var img = document.createElement("img");
			img.classList.add("main-photo-preview");
			img.classList.add("current-image");
			img.file = file;
			
			preview.replaceChild(img, oldChild);
			
			var reader = new FileReader();
			reader.onload = ( function(aImg) {
				return function(event) {
					aImg.src = event.target.result;
					var photoJSON = {"property_photo": event.target.result}
					that.model.set(photoJSON);
				};
			})(img);
			reader.readAsDataURL(file)
		}
	},
	
	createProperty: function(event) {
		event.preventDefault();
		
		$(event.currentTarget).prop("disabled", true);

		var formData = $(".new-property-form").serializeJSON();
		
		this.model.set(formData);
		
		this.model.save(null, {
			success: function(model, response, options) {
				StreetEasyClone.router.navigate("property/" + model.id, {trigger: true});
			},
			error: function(model, response, options) {
				console.log("There was an error");
			}
		});
	},
	
	addMorePhotos: function(event) {
		event.preventDefault();
		
		var formData = $(".new-property-form").serializeJSON();
		this.model.set(formData);
		
		var subView = new StreetEasyClone.Views.PhotoUpload({model: this.model});
		$(".additional-photos-container").html(subView.render().$el);
		
		
		// var formData = $(".new-property-form").serializeJSON();
		//
		// this.model.set(formData);
		//
		// this.model.save(null, {
		// 	success: function(model, response, options) {
		// 		var subView = new StreetEasyClone.Views.PhotoUpload({model: model});
		// 		$(".additional-photos-container").html(subView.render().$el);
		// 	},
		// 	error: function(model, response, options) {
		// 		console.log("There was an error");
		// 	}
		// });
	},
	
	uploadMainPhoto: function (event) {
		$("#main-photo-upload").click();
	},
	
	preventDefaultFormSubmission: function(event) {
		event.preventDefault();
	}
});