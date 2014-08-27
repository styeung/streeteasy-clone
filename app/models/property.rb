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
  
  has_many(
    :property_saves,
    class_name: "PropertySave",
    foreign_key: :property_id,
    primary_key: :id,
    inverse_of: :property
  )
  
  has_many :following_users, through: :property_saves, source: :user

end
