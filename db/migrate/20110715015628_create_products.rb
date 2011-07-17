class CreateProducts < ActiveRecord::Migration
  def self.up
    create_table :products do |t|
      t.boolean :verify, :default => false
      t.boolean :safement, :default => false
      t.string :title
      t.text :description
      t.string :tel
      t.references :user
      t.string    :avatar_file_name
      t.string    :avatar_content_type
      t.integer   :avatar_file_size
      
      t.timestamps
    end
  end

  def self.down
    drop_table :products
  end
end
