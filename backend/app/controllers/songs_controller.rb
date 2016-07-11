class SongsController < ApplicationController
  before_action :authentication_user!

  def index
    @play_lists = current_user.play_lists
  end
end
