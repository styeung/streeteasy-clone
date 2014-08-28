class AddAttachmentPropertyPhotoToProperties < ActiveRecord::Migration
  def self.up
    change_table :properties do |t|
      t.attachment :property_photo
    end
  end

  def self.down
    remove_attachment :properties, :property_photo
  end
end
