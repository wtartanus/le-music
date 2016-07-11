class PlayList < ApplicationRecord
  has_many(:songs)
  belongs_to :user

  def to_json(options)
    super( render(  json: play_lists.as_json(include: :songs)) )
  end
end
