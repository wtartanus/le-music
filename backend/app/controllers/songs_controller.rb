class SongsController < ApplicationController
  

  def index
    @play_lists = current_user.play_lists
  end

  def create
    if(!params["song"]["play_list_id"]) 
      playlist = PlayList.find_by(name: "all songs")
      params["song"]["play_list_id"] = playlist.id
    end

    Song.create({artist: params["song"]["artist"], album: params["song"]["album"] , genre: params["song"]["genre"], title: params["song"]["title"], 
      url: params["song"]["url"] , play_list_id: params["song"]["play_list_id"] })
  end

  def destroy
    song = Song.find(params[:id])
    song.destroy
  end
end
