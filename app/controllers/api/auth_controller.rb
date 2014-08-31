class Api::AuthController < ApplicationController
  def check_current_user
    render json: {id: current_user.id}
  end
end