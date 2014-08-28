class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :author_id, null: false
      t.integer :property_id, null: false
      t.string :title, null: false
      t.string :body, null: false
      
      t.timestamps
    end
    
    add_index :comments, :author_id
    add_index :comments, :property_id
  end
end
