class CreateAlbumPhotos < ActiveRecord::Migration
  def change
    create_table :album_photos do |t|
      t.integer :property_id, null: false
      
      t.timestamps
    end
    
    add_index :album_photos, :property_id
  end
end
