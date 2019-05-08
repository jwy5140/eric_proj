class CreateEnemies < ActiveRecord::Migration[5.2]
  def change
    create_table :enemies do |t|
      t.string :name
      t.string :image
      t.integer :health

      t.timestamps
    end
  end
end
