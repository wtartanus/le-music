var React = require('react');

var PlayerBox = React.createClass({
 getInitialState: function() {
  return (
  {currentSong: null , currentSongIndex: null, currentPlaylist: null, playlists: null}
  )
 },

 componentDidMount: function() {
  
    this.we();
    var player = document.getElementById('player');
    var src = player.childNodes[0]
    player.addEventListener('ended', function() {
      var size = this.state.playlists[this.state.currentPlaylist].songs.length
      console.log(size)
      var i = this.state.currentSongIndex;
      i += 1
      if( i === size ) {
        i = 0
      }
      this.setState({currentSongIndex: i  })
      var song = this.state.playlists[this.state.currentPlaylist].songs[i].url
      this.setState({currentSong: song})
      player.load();
      player.play();
    }.bind(this))

  },

  we: function() {
    console.log("hi")
    var request = new XMLHttpRequest();
    request.open("GET", this.props.url + "/play_lists.json")
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    request.onload = function() {
     if(request.status === 200 ) {
       var playlists = JSON.parse(request.responseText);
       console.log("got it", playlists);
       this.setState({playlists: playlists});
       this.setState({currentSongIndex: 0});
       this.setState({currentSong: playlists[0].songs[0].url});
       this.setState({currentPlaylist: 0});
       var player = document.getElementById('player');
       player.load()
       player.play()
     } else if ( request.status === 401 ) {
       console.log("we")
     }  
    }.bind(this)
    
     request.send(null);
  },

 render: function() {
  return (
    <div>
      <h3>Player Box</h3>
      <audio controls preload="auto" id="player">
      
        <source src={this.state.currentSong}/>
        
      Your browser does not support the audio element.
      </audio>

    </div>
  )
 }
});

module.exports = PlayerBox;