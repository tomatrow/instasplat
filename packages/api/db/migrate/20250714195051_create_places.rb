class CreatePlaces < ActiveRecord::Migration[8.0]
  def change
    create_table :places do |t|
      t.string :name
      t.text :address
      t.decimal :latitude
      t.decimal :longitude
      t.text :description
      t.string :phone
      t.string :website
      t.text :hours
      t.string :place_type

      t.timestamps
    end
  end
end
