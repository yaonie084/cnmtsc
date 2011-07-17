# To change this template, choose Tools | Templates
# and open the template in the editor.
class Admin::ProductsController < Admin::BaseController
  main_nav_highlight :content
  sec_nav_highlight :products
  def index
    @products = Product.all
  end

  # GET /news/1
  # GET /news/1.xml

  def new
    @product = @user.products.new
  end

  # GET /news/1/edit
  def edit
    @product = Product.find(params[:id])
  end

  # POST /news
  # POST /news.xml
  def create
    @product = @user.products.new(params[:product])
    @product.save
    flash[:notice] = :create_successful
    redirect_to admin_products_path()
  end

  # PUT /news/1
  # PUT /news/1.xml
  def update
    @product = Product.find(params[:id])
    @product.update_attributes(params[:product])
    flash[:notice] = :update_successful
    redirect_to admin_products_path()
  end

  # DELETE /news/1
  # DELETE /news/1.xml
  def destroy
    @product = Product.find(params[:id])
    @product.destroy

    redirect_to admin_products_path()
  end
end