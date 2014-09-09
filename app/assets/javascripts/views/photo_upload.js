StreetEasyClone.Views.PhotoUpload = Backbone.View.extend({
	template: JST["templates/photo_upload"],
	
	events: {
		"change .image-upload": "handleAdditionalFiles",
		"submit .additional-photos-form": "saveAll",
		"mouseenter .existing-photo-preview": "addDeleteButton",
		"mouseleave .delete-cover": "removeDeleteButton",
		"mouseenter .additional-photo-preview": "addDeleteButton",
		"mouseleave .delete-cover": "removeDeleteButton",
		"click .delete-cover": "removePhoto",
		"click .add-images-button": "uploadPhoto"
	},
	
	initialize: function(event) {
		this.toBeRemoved = [];
		this.uploadedPhotosCount = 0;
		this.listenTo(this.model.album_photos(), "add", this.showUploadingStatus);
	},
	
	render: function() {
		var that = this;
		var content = this.template({uploadedPhotosCount: this.uploadedPhotosCount});
		this.$el.html(content);
		
		var $addImagesButton = $("<li><button class='add-images-button'>⬆ Upload More Images</button><li>");
		this.$(".image-list").append($addImagesButton);

		var album_photos = this.model.album_photos();
		if(album_photos.length > 0) {
			album_photos.each(function(album_photo) {
				var $image = $("<img class='existing-photo-preview'>");
			
				$image.attr("src", album_photo.escape("photo_url"));
				$image.attr("data-id", album_photo.escape("id"));
				
				var $listItem = $("<li></li>");
				$listItem.append($image);

				that.$(".image-list").prepend($listItem);
			});
		}

		return this;
	},
	
	handleAdditionalFiles: function(event) {
		var preview = $(".image-list");
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
			
			var $listItem = $("<li></li>");
			$listItem.append($(img));
			preview.prepend($listItem);
			
			// preview.appendChild(img);
			
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
					
					if(i === (that.toBeRemoved.length - 1) && imgs.length === 0) {
						property.album_photos().get(that.toBeRemoved[i]).destroy({
							success: function(model, response) {
								StreetEasyClone.router.navigate("property/" + property.id, {trigger: true});
							}
						});
					}
					else {
						property.album_photos().get(that.toBeRemoved[i]).destroy({
							success: function(model, response) {
							}
						});
					}
					
				}
		
				for(var i = 0; i < imgs.length; i++) {
					if(i === 0) {
						$(".uploaded-photos-count").toggleClass("active");
					}
					if(i < imgs.length - 1) {
						property.album_photos().create({
							"property_id": property.id,
							"photo": imgs[i].src
						}, {
							success: function(model, resp) {
								that.uploadedPhotosCount++;
								
								$(".uploaded-photos-count").html(that.uploadedPhotosCount + " Photos Uploaded");
							},
							error: function(model, resp) {
							}
						});
					}
					else if (i === imgs.length - 1) {
						property.album_photos().create({
							"property_id": property.id,
							"photo": imgs[i].src
						}, {
							success: function(model, resp) {
								that.uploadedPhotosCount++;
								
								$(".uploaded-photos-count").html("All Photos Uploaded");
								
								StreetEasyClone.router.navigate("property/" + property.id, {trigger: true});
							}, 
							error: function(model, resp) {
							}
						});
					}
				}
			},
			error: function(model, response, options) {
			}
		});
	},
	
	uploadPhoto: function (event) {
		$(".image-upload").click();
	},
	
	addDeleteButton: function(event) {
		var position = $(event.currentTarget).offset();
		var leftPos = position["left"];
		var topPos = position["top"];
		var dataId = $(event.currentTarget).attr("data-id");
		var $div = $("<div class='delete-cover' data-parent-id='"+ dataId + "' style='left: " + leftPos + "px; top: " + topPos + "px'>Delete Photo</div>");
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