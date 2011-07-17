class Product < ActiveRecord::Base
    has_attached_file :avatar,
    :url  => "/system/products/:id/:style_:basename.:extension",
    :path => ":rails_root/public/system/products/:id/:style_:basename.:extension",
    :styles => { :normal => '160x160#', :thumb => '80x80#',
  },
    :default_style => :normal


  validates_attachment_size :avatar, :less_than => 2.megabytes
  belongs_to :user
  has_many :orders
  has_many :messages
end
