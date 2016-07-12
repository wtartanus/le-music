var React = require('react');
require('../../node_modules/aws-sdk/dist/aws-sdk');
var AWS = window.AWS;
AWS.config.update({accessKeyId: 'AKIAIVWTTSSQEUIGTDZA', secretAccessKey: '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'});

var AddSongBox = React.createClass({
  getInitialState: function() {
    return { progress: ""}
  },

  handleSubmit: function(e) {
    e.preventDefault()
    this.getInfo();
    var file = document.getElementById("file").files[0];
    var params = {Key: file.name, ContentType: file.type, Body: file};
    var display = document.getElementById("display-progress");
    display.style.visibility = "visible";
    var that = this;
    var bucket = new AWS.S3({params: {Bucket: 'lemusic'}});
    bucket.upload(params).on('httpUploadProgress', function(evt) {
    var pro = parseInt((evt.loaded * 100) / evt.total);
    that.setState({progress: "Uploading song: " + pro + "%" });
    
    }).send(function(err, data) {
    that.setState({progress: "Upload finished."});
   });
  
  // return false;
  },

  getInfo: function() {
   var artist = document.getElementById('artist');
   var album = document.getElementById('album');
   var genre = document.getElementById('genre');
   var title = document.getElementById('title');
   var file = document.getElementById('file').files[0];

   var info = {
    song:{
    artist: artist.value,
    album: album.value,
    genre: genre.value,
    title: title.value,
    url: "https://s3-eu-west-1.amazonaws.com/lemusic/" + file.name
      }
   }

   console.log(info)

   this.props.sendInfo(this.props.url, info )

  },

  render: function() {
    return (
      <div>
        <form id="add-song" encType="multipart/form-data" onSubmit={this.handleSubmit}>
          <input type="file" id="file" name="name" />
          <label htmlFor="artist">Artist:</label>
          <input type="text" id="artist" name="artist" />
          <label htmlFor="album">Album:</label>
          <input type="text" id="album" name="album" />
          <label htmlFor="genret">Genre:</label>
          <input type="text" id="genre" name="genre" />
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" />
          <button type="submit">Add Song</button>
        </form>
        <div id="display-progress">
          {this.state.progress} 
        </div>
      </div>
      )
  }
});

module.exports = AddSongBox;