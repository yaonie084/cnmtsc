class Admin::UsersController < Admin::BaseController
  main_nav_highlight :system
  sec_nav_highlight :users
  before_filter :find_user, :except => [ :index, :new, :create, :change_password, :update_password ]

  def index
    @scope = User.where(:superadmin => false)
    @users = @scope.paginate(:page => params[:page])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    @user.save
    flash[:notice] = t(:create_successful)
    respond_with(@user, :location => admin_users_path())
  end

  def edit
  end

  def update
    @user.update_attributes(params[:user])
    flash[:notice] = t(:update_successful)
    respond_with(@user, :location => admin_users_path())
  end

  def change_password
  end

  def update_password
    current_user.required_old_password!

    if current_user.update_attributes(params[:user])
      redirect_to admin_root_path(), :notice => t(:password_update_successfully)
    else
      render :change_password
    end
  end

  def destroy
    @user.destroy
    flash[:notice] = t(:operate_successful)
    respond_with(@user, :location => admin_users_path())
  end

  def find_user
    @user = User.find(params[:id])
  end
end
