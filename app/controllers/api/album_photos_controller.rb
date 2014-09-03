class Api::AlbumPhotosController < ApplicationController
  def index
    @photos = AlbumPhoto.where(property_id: params[:property_id])
    
    render json: @photos
  end
  
  def show
    @photo = AlbumPhoto.find(params[:id])
    
    render json: @photo
  end
  
  def create
    @photo = AlbumPhoto.new(album_photo_params)
    
    if @photo.save
      redirect_to property_url(params[:property_id])
    else
      flash[:errors] = @photo.errors.full_messages
      redirect_to property_url(params[:property_id])
    end
  end
  
  def destroy
    @photo = AlbumPhoto.find(params[:id])
    
    if @photo.destroy
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
