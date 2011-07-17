class CreateNews < ActiveRecord::Migration
  def self.up
    create_table :news do |t|
      t.string :title
      t.text :body
      t.string :publisher
      t.references :user
      t.string    :avatar_file_name
      t.string    :avatar_content_type
      t.integer   :avatar_file_size
      t.timestamps
    end
  end

  def self.down
    drop_table :news
  end
end
