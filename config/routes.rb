Rails.application.routes.draw do
  root to: "root#root"

  resources :users, only: [:new, :create, :edit, :update, :destroy]

  resource :session, only: [:new, :create, :destroy]
end
