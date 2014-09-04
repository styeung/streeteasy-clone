class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?, :owner?, :all_neighborhoods, :all_apt_types, :all_addresses
  
  @all_neighborhoods = nil
  @all_apt_types = nil

  def current_user
    return nil if session[:session_token].nil?

    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def signed_in?
    return false if !current_user

    true
  end
  
  def owner?(property)
    return false if !current_user
    
    return false if current_user.id != property.owner_id.to_i
    
    true
  end

  def login(user)
    @current_user = user
    session[:session_token] = user.session_token
  end

  def logout
    current_user.reset_session_token
    session[:session_token] = nil
  end
  
  def require_signed_in
    if !signed_in?
      flash[:errors] = ["Please sign in."]
      redirect_to new_session_url
    end
  end
  
  def require_signed_out
    if signed_in?
      flash[:errors] = ["You are already signed in."]
      redirect_to root_url
    end
  end
  
  def require_owner
    if current_user.id == params[:user_id]
      flash[:errors] = ["You do not the owner of this listing."]
      redirect_to root_url
    end
  end
  
  def all_neighborhoods
    @all_neighborhoods ||= Property.uniq.pluck(:neighborhood).map(&:strip).reject.sort
  end
  
  def all_apt_types
    @all_apt_types ||= Property.uniq.pluck(:apt_type).map(&:strip).reject.sort
  end
  
  def all_addresses
    @all_addresses ||= Property.uniq.pluck(:address).map(&:strip).reject.sort
  end
  
end
