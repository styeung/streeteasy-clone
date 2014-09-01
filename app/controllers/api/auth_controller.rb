class Api::AuthController < ApplicationController
  def check_current_user
    if signed_in?
      render json: {id: current_user.id}
    else
      render json: {id: nil}
    end
  end
end