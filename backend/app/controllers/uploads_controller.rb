class UploadsController < ApplicationController
  

  def new
  end

  def create
  
    info = request.raw_post()
    info = JSON.parse(info)
    url = "https://lemusic.s3.amazonaws.com/#{info['linkName']}"
    Song.create( artist: info["artist"].downcase, album: info["album"].downcase, genre: info["genre"].downcase, title: info["title"].downcase, url: url)
    
  end

  def index
    songs = Song.all
    render json: songs
  end
end