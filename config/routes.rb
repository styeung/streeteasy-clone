Rails.application.routes.draw do
  root to: "root#root", as: "root"

  resources :users do
    resources :properties, only: [:new, :create]
  end

  resource :session, only: [:new, :create, :destroy]

  get "/", to: "root#root"

  resources :properties, except: [:new, :create]
end
