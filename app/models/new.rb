class New < ActiveRecord::Base
  has_attached_file :avatar,
    :url  => "/system/news/:id/:style_:basename.:extension",
    :path => ":rails_root/public/system/news/:id/:style_:basename.:extension",
    :styles => { :normal => '220x160#', :thumb => '80x80#',
  },
    :default_style => :normal
  

  validates_attachment_size :avatar, :less_than => 2.megabytes
  belongs_to :user
#  validates_attachment_presence :avatar
end
