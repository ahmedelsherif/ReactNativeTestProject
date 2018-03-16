class ToDoList < ActiveRecord::Base
  belongs_to :user

  validates :title,  :presence => {message: "#{MISSING_PARAMETERS_ID}"} , :on => :create

end
