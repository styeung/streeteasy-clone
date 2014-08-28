class Property < ActiveRecord::Base
  validates :address, :price, presence: true
  
  geocoded_by :full_address
  after_validation :geocode
  
  has_attached_file :property_photo, :styles => {
          :big => "576x400>",
          :small => "170x110#"
        }
  
  validates_attachment_content_type(
          :property_photo,
          :content_type => /\Aimage\/.*\Z/
        )
  
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
  
  def full_address
    query_array = []
    
    if self.address
      query_array << self.address
    elsif self.borough
      query_array << self.borough
    elsif self.zip
      query_array << self.zip
    end
    
    query_array << "New York"
    query_array << "NY"
    
    query_string = query_array.join(", ")
    
  end

end
