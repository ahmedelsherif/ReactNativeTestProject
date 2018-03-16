def end_points
  post 'login', to: 'authentication#login'
  post 'signup', to: 'authentication#signup'
  get 'show_profile', to: 'authentication#show_profile'
  resources :to_do_lists, :only => [:index, :create, :update, :destroy]

end

Rails.application.routes.draw do
  api_version(:module => "api/v1", :header => {:name => "API-VERSION", :value => "v1"}) do
    end_points
  end
end
