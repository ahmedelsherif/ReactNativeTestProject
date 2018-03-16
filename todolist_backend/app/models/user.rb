class User < ActiveRecord::Base
  has_secure_password
  validates :name, :email, :password,  :presence => {message: "#{MISSING_PARAMETERS_ID}"} , :on => :create
  validates :password_confirmation,  :presence =>   {message: "#{MISSING_PARAMETERS_ID}"}, :if => '!password.nil?'
  validates :password, :confirmation => { message: "#{PASSWORD_AND_CONFIRMATION_NOT_EQUAL_ID}" }
  validates :email, uniqueness: { case_sensitive: false,  message: "#{EMAIL_TAKEN_ID}" }
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/, :message => "#{INVALID_EMAIL_FORMAT_ID}"
  validates :password, length: { minimum: 8 , message: "#{PASSWORD_LESS_THAN_MINIMUM_LENGTH_ID}"}, :if => '!password.nil?'
  validates :email, length: { maximum: 500 , message: "#{EMAIL_LENGTH_EXCEEDED_MAX_ID}"}
  validates :name, length: { in: 3..20, :message => "#{NAME_LENGTH_NOT_WITHIN_LIMITS_ID}" }

  has_many :to_do_lists
end
