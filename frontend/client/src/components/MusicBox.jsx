var React = require('react');
var AddSongBox = require('./AddSongBox.jsx');

var MusicBox = React.createClass({
  getInitialState: function() {
    return { songs: [] }
  },

  componentDidMount: function() {
    this.getData(this.props.url)
  },

  getData: function(url) {
    var request = new XMLHttpRequest();
    request.open("Get", url);
    request.onload = function() {
      if(request.status === 200 ) {
         var data = JSON.parse(request.responseText);
         console.log(data)
         // this.setState({ songs = data })
      } 
    }
    request.send(null)
  },

  sendData: function(url,song) {
    console.log( song )
   var request = new XMLHttpRequest();
   request.open("POST", url);
   // request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
   request.onload = function() {
     if(request.status === 200 ) {
        console.log( 'yeeeehhaaaaaa')
     } 
   }
   // var blob = new Blob([song], {type: 'text/plain'});

   request.send( song );
  },

  render: function() {
    return (
      <div>
        <h1>MusicBox</h1>
        <AddSongBox sendSong={this.sendData} url={this.props.url} />
      </div>
      )
  }
});

module.exports = MusicBox;