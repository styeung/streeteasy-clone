class AddBoroughColumn < ActiveRecord::Migration
  def change
    add_column :properties, :borough, :string
  end
end
