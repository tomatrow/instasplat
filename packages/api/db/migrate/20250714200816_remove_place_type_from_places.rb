class RemovePlaceTypeFromPlaces < ActiveRecord::Migration[8.0]
  def change
    remove_column :places, :place_type, :string
  end
end
