class User < ActiveRecord::Base
  
  acts_as_authentic
  
  #dragonfly_for :avatar_file, :scope => 'avatars', :with_paperclip => :pc_avatar
  has_attached_file :avatar,
    :url  => "/system/users/:id/:style_:basename.:extension",
    :path => ":rails_root/public/system/users/:id/:style_:basename.:extension",
    :styles => { :normal => '220x160#', :thumb => '80x80#',
    },
    :default_style => :normal
  #has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }

  validates_attachment_size :avatar, :less_than => 2.megabytes

  #validates_attachment_presence :avatar

  attr_accessor :old_password
  attr_protected :superadmin
  #has_many :episodes
  has_many :news, :class_name => "New"
  has_many :products, :class_name => "Product"
  has_many :orders, :class_name => "Order"

  validate :validate_old_password, :if => :required_old_password?
  
  #symbolize :gender, :in => [ :male, :female ], :scopes => true, :methods => true
  def url(*args)
    avatar.url(*args)
  end
  alias :public_filename :url

  def url_normal
    url(:normal)
  end

  def url_thumb
    url(:thumb)
  end
  def validate_old_password
    errors.add(:old_password) unless valid_password?(self.old_password)
  end

  def required_old_password!
    @old_password_required = true
    @password_changed = true
  end

  def required_old_password?
    @old_password_required
  end
end

# == Schema Information
#
# Table name: users
#
#  id                  :integer         not null, primary key
#  login               :string(255)     not null
#  email               :string(255)     not null
#  crypted_password    :string(255)     not null
#  password_salt       :string(255)     not null
#  persistence_token   :string(255)     not null
#  superadmin          :boolean         default(FALSE)
#  login_count         :integer         default(0), not null
#  failed_login_count  :integer         default(0), not null
#  last_request_at     :datetime
#  current_login_at    :datetime
#  last_login_at       :datetime
#  current_login_ip    :string(255)
#  last_login_ip       :string(255)
#  gender              :string(255)
#  avatar_file_name    :string(255)
#  avatar_content_type :string(255)
#  avatar_file_size    :integer
#  created_at          :datetime
#  updated_at          :datetime
#

