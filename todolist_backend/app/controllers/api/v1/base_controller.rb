module Api
  module V1
    class BaseController < ApplicationController
      before_action :authenticate_request
      attr_reader :current_user
       
       # method returns meta json object with code and message
       def meta(code, message_id)
        return {code: code, message_id: message_id,message: SERVER_MESSAGES[message_id]}
      end
        
      def get_first_error_message(errors)
        puts "errors = #{errors.full_messages}"
        msg = errors.first[1].to_i rescue nil
        msg = INVALID_PARAMETERS_ID if msg == 0 or msg.nil?
        return msg
      end
      
     private
      
     def authenticate_request
       @current_user = AuthorizeApiRequest.call(request.headers).result
        render :json => {:meta => meta(UNAUTHORIZED_CODE, UNAUTHORIZED_ID)}, :status =>  :unauthorized unless @current_user
     end
     
    end
  end
end