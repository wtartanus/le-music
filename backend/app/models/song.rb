class Song < ApplicationRecord
  belongs_to :play_list
  has_many( :users, {through: :play_list} )
end
