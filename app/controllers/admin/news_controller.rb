class Admin::NewsController < Admin::BaseController
  main_nav_highlight :content
  sec_nav_highlight :news
  def index
    @news = New.all
  end

  # GET /news/1
  # GET /news/1.xml

  def new
    @new = @user.news.new
  end

  # GET /news/1/edit
  def edit
    @new = New.find(params[:id])
  end

  # POST /news
  # POST /news.xml
  def create
    @new = @user.news.new(params[:new])
    @new.save
    flash[:notice] = :create_successful
    redirect_to admin_news_index_path()
  end

  # PUT /news/1
  # PUT /news/1.xml
  def update
    @new = New.find(params[:id])
    @new.update_attributes(params[:new])
    flash[:notice] = :update_successful
    redirect_to admin_news_index_path()
  end

  # DELETE /news/1
  # DELETE /news/1.xml
  def destroy
    @new = New.find(params[:id])
    @new.destroy

    redirect_to admin_news_index_path()
  end
end