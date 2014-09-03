class AlbumPhotosController < ApplicationController
  
  def create
    @album_photo = AlbumPhoto.new(album_photo_params)
    
    if @album_photo.save
      redirect_to property_url(params[:property_id])
    else
      flash[:errors] = @album_photo.errors.full_messages
      redirect_to property_url(params[:property_id])
    end
  end
  
  def destroy
    @album_photo = AlbumPhoto.find(params[:id])
    
    if @album_photo.destroy
      redirect_to property_url(params[:property_id])
    else
      flash[:errors] = ["Sorry, an error occurred when trying to delete your photo. Please try again"]
      redirect_to property_url(params[:property_id])
    end
      
  end
  
  def album_photo_params
    params.require(:album_photo).permit(:property_id, :photo)
  end
end
