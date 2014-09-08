class Property < ActiveRecord::Base
  include PgSearch
  
  pg_search_scope :search, :against => [:address, :neighborhood, :zip, :borough]
  
  validates :address, :price, presence: true
  
  geocoded_by :full_address
  after_validation :geocode
  
  has_attached_file :property_photo, :styles => {
          :big => "574x385#",
          :small => "180x113#"
          }, :default_url => "/images/missing_:style.png"
          
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
  
  has_many(
    :comments,
    class_name: "Comment",
    foreign_key: :property_id,
    primary_key: :id,
    inverse_of: :property
  )
  
  has_many(
    :album_photos,
    class_name: "AlbumPhoto",
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
  
  def self.indexQuery(search_params)
    query_string = ""
    # count = 0
    # params_length = search_params.length
    comparator = {
      apt_type: "=",
      min_price: ">=",
      max_price: "<=",
      beds: "=",
      baths: ">=",
    }
    
    location_value = nil
    values_hash = {}

    search_params.each do |key, value|
      if !value.empty?
        if key == "location"
          location_value = value
        else
          values_hash[key.to_sym] = value
          if !query_string.length == 0
            query_string.concat(" AND ")
          end
            
          if key == "min_price" || key == "max_price"
            query_string.concat("price #{comparator[key.to_sym]} :#{key}")
          else
            query_string.concat("#{key} #{comparator[key.to_sym]} :#{key}")
          end
        end
      end
    end
    
    if location_value.nil?
      return Property.where(query_string, values_hash)
    else
      return Property.search(location_value).where(query_string, values_hash)
    end
  end
  

end
