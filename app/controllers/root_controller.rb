class RootController < ApplicationController

  def root
    @property = Property.new()
  end
end
