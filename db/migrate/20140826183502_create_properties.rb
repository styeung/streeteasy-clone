class CreateProperties < ActiveRecord::Migration
  def change
    create_table :properties do |t|
      t.integer :owner_id, null: false
      t.string :address, null: false
      t.string :unit
      t.string :zip, null: false
      t.string :neighborhood, null: false
      t.integer :price, null: false
      t.integer :beds
      t.decimal :baths
      t.integer :sq_ft
      t.string :apt_type, null: false

      t.timestamps
    end

    add_index :properties, :owner_id
    add_index :properties, [:address, :unit], unique: true
    add_index :properties, :zip
    add_index :properties, :neighborhood
    add_index :properties, :price
    add_index :properties, :beds
    add_index :properties, :baths
    add_index :properties, :sq_ft
    add_index :properties, :apt_type
  end
end
