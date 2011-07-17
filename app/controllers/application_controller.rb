class ApplicationController < ActionController::Base
  protect_from_forgery
  respond_to :html, :xml, :json
  helper_method :current_user_session, :current_user

  rescue_from CanCan::AccessDenied do |exception|
    unless current_user
      redirect_to login_path(:return_to => request.request_uri), :notice => :need_login_first
    else
      redirect_to root_path(), :notice => :can_not_access
    end
  end
  def self.authorize_namespace(options = {})
    before_filter(:authorize_namespace, options.slice(:only, :except))
    write_inheritable_hash(:authorize_namespace, options)
  end

  def authorize_namespace
    options = self.class.read_inheritable_attribute(:authorize_namespace)
    authorize!(params[:action].to_sym, options[:namespace])
  end

  def self.menu_nav_highlight(name)
    class_eval do
      before_filter { |c| c.instance_variable_set(:@menu_nav, name) }
    end
  end

  def self.sec_nav_highlight(name)
    class_eval do
      before_filter { |c| c.instance_variable_set(:@sec_nav, name) }
    end
  end

  def self.main_nav_highlight(name)
    class_eval do
      before_filter { |c| c.instance_variable_set(:@main_nav, name) }
    end
  end

  private
  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.user
  end
end
