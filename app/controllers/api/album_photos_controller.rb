class Api::AlbumPhotosController < ApplicationController
  def index
    @album_photos = AlbumPhoto.where(property_id: params[:property_id])
    
    render json: @album_photos
  end
  
  def show
    @album_photo = AlbumPhoto.find(params[:id])
    
    render json: @album_photo
  end
  
  def create
    @album_photo = AlbumPhoto.new(album_photo_params)
    
    if @album_photo.save
      render json: @album_photo
    else
      render json: @album_photo.errors.full_messages
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
    params.permit(:property_id, :photo)
  end
end
