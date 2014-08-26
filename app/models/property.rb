class Property < ActiveRecord::Base
  validates :address, :price, presence: true

  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id,
    dependent: :destroy,
    inverse_of: :properties
  )

end
