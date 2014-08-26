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


end
