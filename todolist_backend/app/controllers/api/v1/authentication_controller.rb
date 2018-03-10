module Api
  module V1
    class AuthenticationController < BaseController
      skip_before_action :authenticate_request, only: [:login, :signup]
      #Login action
      def login
        authentication = AuthenticateUser.call(params[:email], params[:password])
        return  render json: { meta: meta(UNAUTHORIZED_CODE, INVALID_CREDENTIALS_ID) }, status: :unauthorized unless authentication.success?
        user = User.find_by_email(params[:email])
        auth_token =  authentication.result
        render json: { :user => UserSerializer.new(user, :root => false, :serializer_options => {:show_auth_token => auth_token}),  meta: meta(SUCCESS_CODE, SUCCESS_ID) }
      end

      #Signup action
      def signup
        user = User.new(user_params)
        unless user.save
          error = get_first_error_message(user.errors)
          return render json: { meta: meta(BAD_REQUEST_CODE, error) }, status: :bad_request
        end
        authentication = AuthenticateUser.call(user_params[:email], user_params[:password])
        auth_token =  authentication.result
        render json: { :user => UserSerializer.new(user, :root => false, :serializer_options => {:show_auth_token => auth_token}),  meta: meta(SUCCESS_CODE, SUCCESS_ID) }
      end

      #current user
      def show_profile
        authentication = AuthenticateUser.call(@current_user.email, @current_user.password)
        auth_token =  authentication.result
        render json: { :user => UserSerializer.new(@current_user, :root => false, :serializer_options => {:show_auth_token => auth_token}),  meta: meta(SUCCESS_CODE, SUCCESS_ID) }
      end

      #user's strong parameters
      def user_params
        params.fetch(:user, {}).permit(:name, :email, :password, :password_confirmation)
      end
    end
  end
end

