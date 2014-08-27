class ChangeColumnRequirements < ActiveRecord::Migration
  def change
    change_column :properties, :neighborhood, :string, null: true
    change_column :properties, :borough, :string, null: true
  end
end
