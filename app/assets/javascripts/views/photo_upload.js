StreetEasyClone.Views.PhotoUpload = Backbone.View.extend({
	template: JST["templates/photo_upload"],
	
	events: {
		"change .image-upload": "handleAdditionalFiles",
		"submit .additional-photos-form": "saveAll"
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	},
	
	handleAdditionalFiles: function(event) {
		var preview = document.getElementById("image-container");
		var files = event.currentTarget.files;
		
		for(var i = 0; i < files.length; i++) {
			var file = files[i];
			var imageType = /image.*/;
		
			if(!file.type.match(imageType)) {
				continue;
			}
		
			var img = document.createElement("img");
			img.classList.add("additional-photo-preview");
			img.file = file;
			
			preview.appendChild(img);
			
			var reader = new FileReader();
			reader.onload = (function(aImg) { 
				return function(e) { 
					aImg.src = e.target.result; 
				}; 
			})(img);
			reader.readAsDataURL(file)
		}
	},
	
	saveAll: function(event) {
		event.preventDefault();
		var property = this.model;
		console.log("property", property);
		console.log("property.album_photos()", property.album_photos());
		
		var imgs = document.querySelectorAll(".additional-photo-preview");
		
		for(var i = 0; i < imgs.length; i++) {
			if(i < imgs.length - 1) {
				property.album_photos().create({
					"property_id": property.id,
					"photo": imgs[i].src
				}, {
					success: function(model, resp) {
						console.log("photo " + model.id + " saved");
					},
					error: function(model, resp) {
						console.log(imgs[i].name + "Not saved")
					}
				});
			}
			else if (i === imgs.length - 1) {
				property.album_photos().create({
					"property_id": property.id,
					"photo": imgs[i].src
				}, {
					success: function(model, resp) {
						StreetEasyClone.router.navigate("property/" + property.id, {trigger: true});
					}, 
					error: function(model, resp) {
						console.log(imgs[i].name + " Not saved");
					}
				});
			}
		}
	}
});