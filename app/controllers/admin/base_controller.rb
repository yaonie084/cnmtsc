class Admin::BaseController < ApplicationController
  layout "admin"
  authorize_namespace :namespace => Admin
  before_filter :track_user
  
  def track_user
    @user = current_user
  end
end
