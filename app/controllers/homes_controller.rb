#coding:utf-8
class HomesController < ApplicationController
  menu_nav_highlight :home
  def index
    @products = Product.limit(3)
    @p = Product.first
  end

  def profile
    if current_user != nil
      @user = current_user
      @as_buyers = @user.orders
      @as_sellers = @user.products
    else
      redirect_to login_url
    end
  end

end
