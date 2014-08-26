class Property < ActiveRecord::Base
  validates :address, :price, presence: true

end
