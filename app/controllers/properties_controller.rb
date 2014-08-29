class PropertiesController < ApplicationController
  before_action :require_signed_in, only: [:new, :create, :edit, :update, :destroy]
  before_action :require_owner, only: [:edit, :update, :destroy]
  
  def index
    query_string = ""
    count = 0
    params_length = search_params.length
    comparator = {
      min_price: ">=",
      max_price: "<=",
      beds: ">=",
      baths: ">=",
      sq_ft: ">="
    }

    values_hash = {}

    search_params.each do |key, value|
      if value != ""
        count += 1
        values_hash[key.to_sym] = value
        if query_string.length == 0 || count == params_length
          query_string.concat("#{key} #{comparator[key] ||= "="} :#{key}")
        else
          query_string.concat(" AND ")
          query_string.concat("#{key} #{comparator[key] ||= "="} :#{key}")
        end
      end
    end

    @properties = Property.where(query_string, values_hash).page(params[:page]).per(12)
    
    render :index
  end
  
  def index_map
    query_string = ""
    count = 0
    params_length = search_params.length
    comparator = {
      min_price: ">=",
      max_price: "<=",
      beds: ">=",
      baths: ">=",
      sq_ft: ">="
    }

    values_hash = {}

    search_params.each do |key, value|
      if value != ""
        count += 1
        values_hash[key.to_sym] = value
        if query_string.length == 0 || count == params_length
          query_string.concat("#{key} #{comparator[key] ||= "="} :#{key}")
        else
          query_string.concat(" AND ")
          query_string.concat("#{key} #{comparator[key] ||= "="} :#{key}")
        end
      end
    end

    @properties = Property.where(query_string, values_hash)

    render :index_map
  end

  def new
    @user = User.find(params[:user_id])
    @property = @user.properties.new()
    render :new
  end

  def create
    @user = User.find(params[:user_id])

    @property = @user.properties.new(property_params)

    if @property.save
      redirect_to property_url(@property)
    else
      flash.now[:errors] = @property.errors.full_messages
      render :new
    end
  end

  def show
    @property = Property.find(params[:id])

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
      render json: "Property id #{params[:id]} does not exist"
    end
  end

  def update
    @property = Property.find(params[:id])
    
    if @property.update(property_params)
      redirect_to property_url(@property)
    else
      flash.now[:errors] = @property.errors.full_messages
      render :edit
      
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
    params.require(:property).permit(:address,
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
                                     :longitude)
  end

  def search_params
    params.require(:property).permit(:zip,
                                     :borough,
                                     :neighborhood,
                                     :min_price,
                                     :max_price,
                                     :beds,
                                     :baths,
                                     :sq_ft,
                                     :apt_type)
  end

end
