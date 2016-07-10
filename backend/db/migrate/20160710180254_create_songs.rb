class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.text :artist
      t.text :album
      t.text :genre
      t.text :title
      t.text :url

      t.timestamps null: false
    end
  end
end
