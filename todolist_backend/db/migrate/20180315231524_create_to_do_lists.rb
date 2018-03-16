class CreateToDoLists < ActiveRecord::Migration[5.0]
  def up
    create_table :to_do_lists do |t|
       t.string :title, :index => true
    
      t.integer :user_id, index: true, foreign_key: true
      t.timestamps
    end
  end

  def down
    drop_table :to_do_lists
  end
end
