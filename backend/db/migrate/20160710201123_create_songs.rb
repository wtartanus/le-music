class CreateSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :songs do |t|
      t.string :artist
      t.string :album
      t.string :genre
      t.string :title
      t.string :url
      t.references :play_list, index: true, foreign_key: true

      t.timestamps
    end
  end
end
