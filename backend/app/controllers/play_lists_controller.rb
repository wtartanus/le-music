class PlayListsController < ApplicationController
  before_action :authenticate_user!

  def index
    play_lists = current_user.play_lists
    render(  json: play_lists.as_json(include: :songs) )
  end

  def create
    puts("HI",params["playlist"]["id"])
    PlayList.create({name: params["playlist"]["name"], user_id: params["playlist"]["id"] })
  end

  def destroy
    playlist = PlayList.find(params[:id])
    playlist.destroy
  end
end
