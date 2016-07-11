class PlayListsController < ApplicationController
  before_action :authenticate_user!

  def index
    play_lists = current_user.play_lists
    render(  json: play_lists.as_json(include: :songs) )
  end
end
