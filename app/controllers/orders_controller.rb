class OrdersController < ApplicationController
  def new
    redirect_to root_path if current_user == nil
    @product = Product.find(params[:id])
    @order = @product.orders.new
  end

  def create
    redirect_to root_path if current_user == nil
    @order = Order.new(params[:order])
    @order.user = current_user
    @order.seccess = false
    @order.save
    redirect_to root_path
  end

end
