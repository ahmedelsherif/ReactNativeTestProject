class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :auth_token
  def initialize(objects, options={})
    super
    @options = options[:serializer_options] || {}
  end

  def auth_token
    @options[:show_auth_token]
  end
end
