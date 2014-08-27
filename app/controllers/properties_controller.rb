class PropertiesController < ApplicationController

  def index
    # query_string = ""
#     count = 0
#     params_length = search_params.length
#     comparator = {
#       min_price: ">=",
#       max_price: "<=",
#       beds: ">=",
#       baths: ">=",
#       zip: "=",
#       neighborhood: "=",
#       sq_ft: ">=",
#       apt_type: "="
#     }
#
#     search_params.each do |key, value|
#       count += 1
#       if query_string.length == 0 || count == params_length
#         query_string.concat("key #{comparator[key]} #{value}")
#       else
#         query_string.concat(" and ")
#         query_string.concat("key #{comparator[key]} #{value}")
#       end
#     end
#
#     @properties = Property.where(query_string)
@properties = Property.all.page(params[:page]).per(12)
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
    end

  end

  def destroy
    @property = Property.find(params[:id])

    if @property.destroy
      redirect_to ""
    else
      flash.now[:errors] = @property.errors.full_messages
    end
  end

  def property_params
    params.require(:property).permit(:address,
                                     :unit,
                                     :zip,
                                     :neighborhood,
                                     :price,
                                     :beds,
                                     :baths,
                                     :sq_ft,
                                     :apt_type)
  end

  def search_params
    params.require(:property).permit(:zip,
                                     :neighborhood,
                                     :min_price,
                                     :max_price,
                                     :beds,
                                     :baths,
                                     :sq_ft,
                                     :apt_type)
  end

end
