class Api::PropertiesController < ApplicationController
  before_action :require_signed_in, only: [:new, :create, :edit, :update, :destroy]
  before_action :require_owner, only: [:edit, :update, :destroy]
  
  wrap_parameters false
    
  def index
    if params[:saved] && current_user
      @properties = current_user.saved_properties
    else
      sql_query = ""
    
      comparator = {
        apt_type: "=",
        min_price: ">=",
        max_price: "<=",
        beds: "=",
        baths: ">=",
      }
    
      location_value = nil
      values_hash = {}

      search_params.each do |key, value|
        if !value.empty?
          if key == "location"
            location_value = value
          else
            values_hash[key.to_sym] = value
          
            if !sql_query.empty?
              sql_query.concat(" AND ")
            end
            
            if key == "min_price" || key == "max_price"
              sql_query.concat("price #{comparator[key.to_sym]} :#{key}")
            else
              sql_query.concat("#{key} #{comparator[key.to_sym]} :#{key}")
            end

          end
        end
      end
    
      if location_value.nil?
        @properties = Property.where(sql_query, values_hash).reorder(params[:sort].concat(" NULLS LAST")).page(params[:page]).per(12)
      else
        @properties = Property.search(location_value).where(sql_query, values_hash).reorder(params[:sort].concat(" NULLS LAST")).page(params[:page]).per(12)
      end
    end

    render :index
  end

  def create
    @user = User.find(current_user.id)

    @property = @user.properties.new(property_params)

    if @property.save
      render json: @property
    else
      render json: @property.errors.full_messages, status: 422
    end
  end

  def show
    @property = Property.find(params[:id])
    unless @property.latitude.nil? && @property.longitude.nil?
      @subway_stations = get_closest_subway_stations(@property.latitude, @property.longitude)
    end

    if @property
      render :show
    else
      render json: "Property id #{params[:id]} does not exist"
    end
  end

  def edit
    @property = Property.find(params[:id])

    if @property
      render :edit
    else
      render json: "Property id #{params[:id]} does not exist", status: 422
    end
  end

  def update
    @property = Property.find(params[:id])
    
    if !save_params.empty?
      if @property.following_users << User.find(save_params[:following_user_id])
        render json: @property
      else
        render json: "Sorry, something went wrong with the save. Please try again."
      end
    elsif !property_params.empty?
      if @property.update(property_params)
        render json: @property
      else
        render json: @property.errors.full_messages, status: 422
      end
    end
    

  end

  def destroy
    @property = Property.find(params[:id])

    if @property.destroy
      redirect_to root_url
    else
      flash.now[:errors] = @property.errors.full_messages
    end
  end

  def property_params
    params.permit(:address,
                   :unit,
                   :zip,
                   :borough,
                   :neighborhood,
                   :price,
                   :beds,
                   :baths,
                   :sq_ft,
                   :apt_type,
                   :property_photo,
                   :latitude,
                   :longitude,
                   :description)
  end

  def search_params
    params.require(:property).permit(:location,
                                     :apt_type,
                                     :min_price,
                                     :max_price,
                                     :beds,
                                     :baths)
  end
  
  def save_params
    params.permit(:following_user_id)
  end

  def remove_saved
    @property_save = PropertySave.where("user_id = :current_user_id AND property_id = :property_id", current_user_id: current_user.id, property_id: params[:property_id]).first
    if @property_save.destroy
      render json: @property_save
    else
      render json: @property_save.errors.full_messages, status: 422
    end
  end
  
end
