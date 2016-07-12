var React = require('react');




var PlayerBox = React.createClass({
getInitialState: function() {
  return (
  {currentSong: null , currentSongIndex: null, currentPlaylist: null, playlists: null,
   playlistName: "", playlist: [], songName: ""}
  )
 },

componentDidMount: function() {
  
    this.fetchPlaylists();
    var player = document.getElementById('player');
    player.addEventListener('ended', function() {
     var nextSong = this.nextSong();
     this.changeSong(nextSong);
    }.bind(this))

  },

  componentWillUpdate: function() {
  if(this.state.playlists && this.state.currentPlaylist) {
    playListName = this.state.playlists[this.state.currentPlaylist].name
    playList = this.state.playlists[this.state.currentPlaylist]
  }
  },

  nextSong: function() {
     var src = player.childNodes[0]
     var size = this.state.playlists[this.state.currentPlaylist].songs.length
     var i = this.state.currentSongIndex;
     i += 1
     if( i === size ) {
       i = 0
     }
     return i;
  },

  previousSong: function() {
    var src = player.childNodes[0]
    var size = this.state.playlists[this.state.currentPlaylist].songs.length
    var i = this.state.currentSongIndex;
     i -= 1
    if( i < 0 ) {
      i = (size - 1)
    }

    return i;
  },

  changeSong: function(i) {
    this.setState({currentSongIndex: i  })
    var song = this.state.playlists[this.state.currentPlaylist].songs[i].url
    this.setState({currentSong: song});
    this.setState({songName: this.state.playlists[this.state.currentPlaylist].songs[i].title})
    player.load();
    player.play();
  },

  fetchPlaylists: function() {
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
       this.setState({playlistName: playlists[0].name});
       this.setState({playlist: playlists[0].songs});
       this.setState({songName: playlists[0].songs[0].title});
       var player = document.getElementById('player');
       player.load()
       player.play()
     } else if ( request.status === 401 ) {
       console.log("we")
     }  
    }.bind(this)
    
     request.send(null);
  },

  changeSongByClickName: function(e) {
    this.changeSong(e.target.value);
  },

  createUl: function(array) {
    var list = array.map(function(song,index) {
     return <li key={index} value={index} onClick={this.changeSongByClickName}> {song.title} </li>
     
     }.bind(this));
    return list;
 },

 changeSongByClickNext: function() {
   var index = this.nextSong();
   this.changeSong(index);
 },

 changeSongByClickPrev: function() {
   var index = this.previousSong();
   this.changeSong(index);
 },



 render: function() {
 var ul = ''
 if(this.state.playlist.length > 0 ) {
  ul =  this.createUl(this.state.playlist)
 }
 
  
  return (
    <div>
     <div>
       <h4>{this.state.playlistName}</h4>
       <ul>{ul}</ul>
        
     </div>
      <h3>Player Box</h3>
      <p>{this.state.songName}</p>
      <audio controls preload="auto" id="player">
      
        <source src={this.state.currentSong}/>
        
      Your browser does not support the audio element.
     
      </audio>
      <p onClick={this.changeSongByClickPrev}>Prev</p>
      <p onClick={this.changeSongByClickNext}>NEXT</p>


    </div>
  )
 }
});

module.exports = PlayerBox;