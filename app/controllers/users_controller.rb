class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    @user.save
    flash[:notice] = "create_successful"
    #respond_with(@user, :location => root_path())
    redirect_to root_path()
  end
end