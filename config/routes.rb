Rails.application.routes.draw do
  root to: "root#root", as: "root"

  resources :users do
    resources :properties, only: [:new, :create]
  end

  resource :session, only: [:new, :create, :destroy]

  get "/", to: "root#root"

  resources :properties, except: [:new, :create] do
    resources :comments, only: [:new, :create, :edit, :update, :destroy]
    resources :album_photos, except: [:edit, :update]
  end
  
  get "/index_map", to: "properties#index_map", as: :index_map
  
  namespace :api, defaults: {format: :json} do
    resources :properties do 
      resources :album_photos, except: [:new, :edit]
      resources :comments, except: [:new, :edit]
    end
    
    post "properties/remove_saved", to: "properties#remove_saved"
      
    # get "/auth/check_current_user", to: "auth#check_current_user"
  end

end
