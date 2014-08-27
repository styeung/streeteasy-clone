class ChangeBoroughColumn < ActiveRecord::Migration
  def change
    change_column :properties, :borough, :string, null: false
    add_index :properties, :borough
  end
end
