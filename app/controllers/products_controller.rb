class ProductsController < ApplicationController

  # GET /news
  # GET /news.xml
  menu_nav_highlight :product
  def index
    @products = Product.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @news }
    end
  end

  # GET /news/1
  # GET /news/1.xml
  def show
    @product = Product.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @news }
    end
  end

  def new
    redirect_to login_path() if current_user == nil
    @product = Product.new
  end

  def create
    @product = current_user.products.new(params[:product])
    @product.verify = false
    @product.safement = false
    @product.save
    flash[:notice] = :create_successful
    redirect_to admin_products_path()
  end


end
