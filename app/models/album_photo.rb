class AlbumPhoto < ActiveRecord::Base
  validates :property_id, presence: true
  
  has_attached_file :photo, :styles => {
      :big => "576x400#",
      :small => "170x110#",
      :thumbnail => "24x24#"
    }
 
    validates_attachment_content_type(
      :photo,
      :content_type => /\Aimage\/.*\Z/
    )
 
    belongs_to(
      :property,
      class_name: "Property",
      foreign_key: :property_id,
      primary_key: :id,
      inverse_of: :album_photos
    ) 
end
