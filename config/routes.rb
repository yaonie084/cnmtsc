Cnmtsc::Application.routes.draw do

  get "messages/new/:id" => "messages#new", :as => :message_new
  post "messages" => "messages#create", :as => :messages

  get "orders/new/:id" => "orders#new", :as => :order_new
  post "orders" => "orders#create", :as => :orders
  match "profile" => "homes#profile", :as => :profile

  get "homes/index"
  root :to => "homes#index"
  resource :user_session
  match "login" => "user_sessions#new", :as => :login
  match 'logout' => "user_sessions#destroy", :as => :logout
  match 'register' => "users#new", :as => :register
  #match 'register' => "user"
  resources :news, :only => [:show,:index]
  resources :products, :only => [:show, :index, :new, :create]
  resources :users, :only => [:new, :create]

  namespace :admin do
    root :to => "main#index"
    
    resources :users do
      collection do
        get "change_password"
        put "update_password"
      end
    end
    resources :news
    resources :products
    match "messages" => "messages#index", :as => "messages"
  end

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => "welcome#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
