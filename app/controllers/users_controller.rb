class UsersController < ApplicationController
  before_action :require_signed_out, only: [:new, :create]
  before_action :require_signed_in, only: [:edit, :update, :destroy, :show]

  def new
    @user = User.new

    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def edit
    @user = User.find(params[:id])

    render :edit
  end

  def update
    @user = User.find(params[:id])
    if !user_params.empty?
      if @user.update(user_params)
        redirect_to user_url(@user)
      else
        flash.now[:errors] = @user.errors.full_messages
        render :edit
      end
    elsif !save_params.empty?
      if @user.saved_properties << Property.find(save_params[:saved_property_id])
        redirect_to user_url(@user)
      else
        flash.now[:errors] = @user.errors.full_messages
        render json: "Sorry, something went wrong with the save. Please try again."
      end
    end
      
  end

  def destroy
    @user = User.find(params[:id])

    if @user.destroy
      redirect_to new_user_url
    else
      flash.now[:errors] = @user.errors.full_messages
    end
  end

  def show
    @user = User.find(params[:id])

    if @user
      render :show
    else
      flash.now[:errors] = ["Incorrect user id"]
    end

  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
  
  def save_params
    params.require(:user).permit(:saved_property_id)
  end
end
