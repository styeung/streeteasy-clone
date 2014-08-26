Rails.application.routes.draw do
  root to: "root#root"

  resources :users

  resource :session, only: [:new, :create, :destroy]

  get "/", to: "root#root"

  resources :properties
end
