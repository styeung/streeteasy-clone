StreetEasyClone.Views.PhotoUpload = Backbone.View.extend({
	template: JST["templates/photo_upload"],
	
	events: {
		"change .image-upload": "handleAdditionalFiles",
		"submit .additional-photos-form": "saveAll",
		"mouseenter .existing-photo-preview": "addDeleteButton",
		"mouseleave .delete-cover": "removeDeleteButton",
		"mouseenter .additional-photo-preview": "addDeleteButton",
		"mouseleave .delete-cover": "removeDeleteButton",
		"click .delete-cover": "removePhoto"
	},
	
	initialize: function(event) {
		this.toBeRemoved = [];
	},
	
	render: function() {
		var that = this;
		var content = this.template();
		this.$el.html(content);

		var album_photos = this.model.album_photos();
		if(album_photos.length > 0) {
			album_photos.each(function(album_photo) {
				var $image = $("<img class='existing-photo-preview'>");
			
				$image.attr("src", album_photo.escape("photo_url"));
				$image.attr("data-id", album_photo.escape("id"));

				that.$("#image-container").append($image);
			});
		}

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
			$(img).attr("data-id", "temp_" + i );
			
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
		var that = this;
		var property = this.model;
		
		property.save(null, {
			success: function(model_pre, response, options) {
				var imgs = document.querySelectorAll(".additional-photo-preview");
				
				for(var i = 0; i < that.toBeRemoved.length; i++) {
					console.log(property.album_photos().get(that.toBeRemoved[i]));
					property.album_photos().get(that.toBeRemoved[i]).destroy({
						success: function(model, response) {
							console.log("model " + model.id + " destroyed");
						}
					});
				}
		
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
			},
			error: function(model, response, options) {
				console.log("There was an error");
			}
		});
		
		// event.preventDefault();
// 		var that = this;
// 		var property = this.model;
//
// 		var imgs = document.querySelectorAll(".additional-photo-preview");
//
// 		for(var i = 0; i < this.toBeRemoved.length; i++) {
// 			console.log(property.album_photos().get(this.toBeRemoved[i]));
// 			property.album_photos().get(this.toBeRemoved[i]).destroy({
// 				success: function(model, response) {
// 					console.log("model " + model.id + " destroyed");
// 				}
// 			});
// 		}
//
// 		for(var i = 0; i < imgs.length; i++) {
// 			if(i < imgs.length - 1) {
// 				property.album_photos().create({
// 					"property_id": property.id,
// 					"photo": imgs[i].src
// 				}, {
// 					success: function(model, resp) {
// 						console.log("photo " + model.id + " saved");
// 					},
// 					error: function(model, resp) {
// 						console.log(imgs[i].name + "Not saved")
// 					}
// 				});
// 			}
// 			else if (i === imgs.length - 1) {
// 				property.album_photos().create({
// 					"property_id": property.id,
// 					"photo": imgs[i].src
// 				}, {
// 					success: function(model, resp) {
// 						StreetEasyClone.router.navigate("property/" + property.id, {trigger: true});
// 					},
// 					error: function(model, resp) {
// 						console.log(imgs[i].name + " Not saved");
// 					}
// 				});
// 			}
// 		}
		
	},
	
	addDeleteButton: function(event) {
		var position = $(event.currentTarget).offset();
		var leftPos = position["left"];
		var topPos = position["top"];
		var dataId = $(event.currentTarget).attr("data-id");
		var $div = $("<div class='delete-cover' data-parent-id='"+ dataId + "' style='left: " + leftPos + "px; top: " + topPos + "px'>Delete Photo</div>");
		// var $div = $("<div class='delete-cover' style='left: 220px; top: -93px'></div>");
		// var $div = $("<div class='delete-cover' style='left:" + leftPos + "; top:" + topPos + "'></div>");
		$(event.currentTarget).after($div);
	},
	
	removeDeleteButton: function(event) {
		$(".delete-cover").remove();
	},
	
	removePhoto: function(event) {
		var dataId = $(event.currentTarget).attr("data-parent-id");
		if(dataId.indexOf("temp") !== -1) {
			$(event.currentTarget).remove();
			$(".additional-photo-preview[data-id='"+ dataId +"']").remove();
		}
		else {
			$(event.currentTarget).remove();
			$(".existing-photo-preview[data-id='"+ dataId +"']").remove();
			this.toBeRemoved.push(dataId);
		}
	}
});