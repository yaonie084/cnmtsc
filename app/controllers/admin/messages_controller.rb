class Admin::MessagesController < Admin::BaseController
  main_nav_highlight :content
  sec_nav_highlight :messages
  def index
    @messages = Message.all
  end
end