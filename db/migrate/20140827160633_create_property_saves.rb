class CreatePropertySaves < ActiveRecord::Migration
  def change
    create_table :property_saves do |t|
      t.integer :property_id, null: false
      t.integer :user_id, null: false
      
      t.timestamps
    end
    add_index :property_saves, [:property_id, :user_id], unique: true
  end
end
