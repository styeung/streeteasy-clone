Rails.application.routes.draw do
  root to: "root#root", as: "root"

  resources :users do
    resources :properties, only: [:new, :create]
  end

  resource :session, only: [:new, :create, :destroy]

  get "/", to: "root#root"

  resources :properties, except: [:new, :create] do
    resources :comments, only: [:new, :create, :edit, :update, :destroy]
  end
  
  get "/index_map", to: "properties#index_map", as: :index_map
  
  namespace :api, defaults: {format: :json} do
    resources :properties
  end

end
