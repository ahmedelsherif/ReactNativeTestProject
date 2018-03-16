module Api
  module V1
    class ToDoListsController < BaseController
      before_action :set_to_do_list, only: [:update, :destroy]
      def index
        to_do_lists = @current_user.to_do_lists
        render :json => {:to_do_lists => to_do_lists.map{|obj| ToDoListSerializer.new(obj, :root => false)}, :meta => meta(SUCCESS_CODE, SUCCESS_ID)}
      end

      def create
        @to_do_list = ToDoList.new(to_do_list_params)
        @to_do_list.user = @current_user
        if @to_do_list.save
          show_to_do_list
        else
          error = get_first_error_message(@to_do_list.errors)
          render json: { meta: meta(BAD_REQUEST_CODE, error) }, status: :bad_request
        end
      end

      def update
        if @to_do_list.update(to_do_list_params)
          show_to_do_list
        else
          error = get_first_error_message(@to_do_list.errors)
          render json: { meta: meta(BAD_REQUEST_CODE, error) }, status: :bad_request
        end
      end

      def destroy
        @to_do_list.destroy
        render :json => {:meta => meta(SUCCESS_CODE, SUCCESS_ID) }
      end

      private

      def show_to_do_list
        render json: {to_do_list: ToDoListSerializer.new(@to_do_list, :root => false),  meta: meta(SUCCESS_CODE, SUCCESS_ID) }
      end

      def set_to_do_list
        @to_do_list = ToDoList.where(:id => params[:id]).first
        return render json: { meta: meta(NOT_FOUND_CODE, RECORD_NOT_FOUND_ID) }, status: :not_found if @to_do_list.nil?
      end

      def to_do_list_params
        params.fetch(:to_do_list, {}).permit(:title)
      end

    end
  end
end

