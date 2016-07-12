var React = require('react');




var PlayerBox = React.createClass({
getInitialState: function() {
  return (
  {currentSong: null , currentSongIndex: null, currentPlaylist: null, 
    playlists: null,
   playlistName: "", playlist: [], songName: "", delete: false,
   displaySongs: ""}
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
    setInterval(function() {
    var request = new XMLHttpRequest();
    request.open("GET", this.props.url + "/play_lists.json")
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    request.onload = function() {
     if(request.status === 200 ) {
       var playlists = JSON.parse(request.responseText);
       this.setState({playlists: playlists});
       // this.setState({currentSongIndex: 0});
       // this.setState({currentSong: playlists[0].songs[0].url});
       // this.setState({currentPlaylist: 0});
       // this.setState({playlistName: playlists[0].name});
       // this.setState({playlist: playlists[0].songs});
       // this.setState({songName: playlists[0].songs[0].title});
       var player = document.getElementById('player');
       // player.load()
       // player.play()
     } else if ( request.status === 401 ) {
  
     }  
    }.bind(this)
    
     request.send(null);
     }.bind(this), 900);
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

 changePlayList: function(e) {
   var i = e.target.value;
   this.setState({playlist: this.state.playlists[i].songs });
   this.setState({currentPlaylist: i });
   this.setState({playlistName: this.state.playlists[i].name });
 },

 handleOver: function(e) {
    var p = document.createElement('p');
    p.innerText = "delete";
    p.className = "delete-button"

    p.addEventListener('click', function(e) {
      if(this.state.delete === false) {
        e.target.innerText = "DELETE ??"
        this.setState({delete: true});
      } else if( this.state.delete === true ) {
          var index = e.target.parentElement.value;
          var id = this.state.playlists[index].id
          var request = new XMLHttpRequest();
          request.open("DELETE",this.props.url +"play_lists/" + id);
          request.setRequestHeader("Content-Type", "application/json");
          request.setRequestHeader("Accept", "application/json")
          request.withCredentials = true;
          request.onload = function() {
           if(request.status === 201 ) {
           
           } else if ( request.status === 401 ) {

           }
          }.bind(this)
          
           request.send(null);

     }
    }.bind(this))

    e.target.className = "playlists-names-list"
    e.target.appendChild(p);

 },

 handleOut: function(e) {
   var child = e.target.childNodes[1]
   e.target.className = ""
   e.target.removeChild(child);
   this.setState({delete: false})
 },

 allowDrag: function(e) {
   e.preventDefault();
 },

 handleDrop: function(e) {
  e.preventDefault();
  var songId = e.dataTransfer.getData("text");
  var playListId = this.state.playlists[e.target.value].id;
  var song = this.state.playlists[0].songs[songId]
  var data = {
   song:{
     artist: song.artist,
     album: song.album,
     genre: song.genre,
     title: song.title,
     url: song.url,
     play_list_id: playListId
   }
  }

  var request = new XMLHttpRequest();
  request.open("POST",this.props.url + "/songs");
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Accept", "application/json")
  request.withCredentials = true;
  request.onload = function() {
   if(request.status === 201 ) {
   
   } else if ( request.status === 401 ) {

   }
  }.bind(this)
  
   request.send(JSON.stringify( data ));
   
 },

 deleteSongFromPlaylist: function(e) {
   console.log("",e.target.value)
   var request = new XMLHttpRequest();
   request.open("DELETE",this.props.url + "/songs/" + e.target.value);
   request.setRequestHeader("Content-Type", "application/json");
   request.setRequestHeader("Accept", "application/json")
   request.withCredentials = true;
   request.onload = function() {
    if(request.status === 201 ) {
    
    } else if ( request.status === 401 ) {

    }
   }.bind(this)
   request.send(null);

   var newState = this.state.displaySongs.filter(function(song) {
     if(song.key != e.target.value ) {
      return song
     }
   })

   console.log(newState)

   this.setState({displaySongs: newState});

 },

 displaySongs: function(e) {
  var songs = this.state.playlists[e.target.value].songs
  var songs = songs.map(function(song) {
    return <li value={song.id} key={song.id} onDoubleClick={this.deleteSongFromPlaylist}>{song.title}</li>
  }.bind(this))
 
  this.setState({displaySongs: songs});
  var ul = document.getElementsByClassName('pop-up-playlist')[0];
  ul.className = "pop-up-playlist-show"
 },

 getPlaylistsNames: function(playlists) {
   var list = playlists.map(function(playlist,index) {
     return <li key={playlist.name} onDoubleClick={this.changePlayList} onMouseEnter={this.handleOver} onMouseLeave={this.handleOut} value={index} 
     onDragOver={this.allowDrag} onDrop={this.handleDrop} onClick={this.displaySongs}>
     {playlist.name}</li>

   }.bind(this));
   return list
 },

 changeSongByClickNext: function() {
   var index = this.nextSong();
   this.changeSong(index);
 },

 changeSongByClickPrev: function() {
   var index = this.previousSong();
   this.changeSong(index);
 },

 handleDragStart: function(e) {
  e.dataTransfer.setData("text", e.target.value);
  console.log(e.target.value)
 },

 hideDisplaySongs: function(e) {
   var element = document.getElementsByClassName("pop-up-playlist-show")[0]
   element.className = "pop-up-playlist";
 },

 render: function() {
 var ul = ''
 if(this.state.playlist.length > 0 ) {
  ul =  this.createUl(this.state.playlist)
 }
  var playlistsNames = '' 
  if(this.state.playlists) {
   playlistsNames = this.getPlaylistsNames(this.state.playlists);
}

var allSongs = ""
 if(this.state.playlists) {
  for (var i = this.state.playlists.length - 1; i >= 0; i--) {
    if(this.state.playlists[i].name === "all songs") {
      allSongs = this.state.playlists[i].songs.map(function (song,index) {
        return <li value={index} key={index * .2} draggable="true" 
        onDragStart={this.handleDragStart}>{song.title}</li>
      }.bind(this));
    }
  }
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

     <div id="playlists-names">
      <ul>
       {playlistsNames}
      </ul>
      <ul className="pop-up-playlist">
      {this.state.displaySongs}
      <p onClick={this.hideDisplaySongs}>close</p>
      </ul>
      <ul>
      {allSongs}
      </ul>
     </div>
    </div>
  )
 }
});

module.exports = PlayerBox;