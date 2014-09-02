class AddAttachmentPhotoToAlbumPhotos < ActiveRecord::Migration
  def self.up
    change_table :album_photos do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :album_photos, :photo
  end
end
