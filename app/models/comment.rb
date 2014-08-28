class Comment < ActiveRecord::Base
  validates :author, :property_id, :title, :body, presence: true
  
  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id,
    inverse_of: :authored_comments
  )
  
  belongs_to(
    :property,
    class_name: "Property",
    foreign_key: :property_id,
    primary_key: :id,
    inverse_of: :comments
  )
end
