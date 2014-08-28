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

end
