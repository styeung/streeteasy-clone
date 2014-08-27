class PropertySave < ActiveRecord::Base
  validates :user, :property, null: false
  
  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id,
    inverse_of: :property_saves
  )
  
  belongs_to(
    :property,
    class_name: "Property",
    foreign_key: :property_id,
    primary_key: :id,
    inverse_of: :property_saves
  )
end
