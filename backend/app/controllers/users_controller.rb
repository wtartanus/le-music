class UsersController < ApplicationController

  before_action :authenticate_user!
  def index
    user = current_user
    render( json: user.as_json({ include: { play_lists: { include: :songs } } } ) )
  end
end
