class CreateUsers < ActiveRecord::Migration[5.0]
  def up
    create_table :users do |t|
      t.string :name, :null => false
      t.string :email, :null => false, :unique => true, :index => true
      t.string :password_digest, :null => false
      t.timestamps
    end
  end

  def down
    drop_table :users
  end
end
