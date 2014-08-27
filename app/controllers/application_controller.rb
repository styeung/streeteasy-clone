class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  def current_user
    return nil if session[:session_token].nil?

    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def signed_in?
    return false if !current_user

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
  
end
