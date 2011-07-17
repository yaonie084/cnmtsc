class MessagesController < ApplicationController
  def new
    @product = Product.find(params[:id])
    @message = @product.messages.new
  end

  def create
    @message = Message.new(params[:message])
    @message.save
    redirect_to root_path
  end

end
