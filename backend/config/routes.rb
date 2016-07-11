Rails.application.routes.draw do
  devise_for :users
   # The priority is based upon order of creation: first created -> highest priority.
   # See how all your routes lay out with "rake routes".

   resources :songs
   resources :users
   resources :play_lists

   # You can have the root of your site routed with "root"
   # root 'welcome#index'
   root 'play_lists#index'
end
