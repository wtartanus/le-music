var React = require('react');
require('../../node_modules/aws-sdk/dist/aws-sdk');
var AWS = window.AWS;
AWS.config.update({accessKeyId: 'hello', secretAccessKey: 'hello'});

var AddSongBox = React.createClass({
  getInitialState: function() {
    return { progress: "", show: false}
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

  showHideForm: function() {
    console.log("hi")
    var form = document.getElementById('add-song');
    if(this.state.show) {
      form.style.display = "none"
      this.setState({show: false})
      return;
    }
    form.style.display = "initial"
    this.setState({show: true})
  },

  render: function() {
    return (
      <div id="add-song-container">
       <h3 id="add-song-text" onClick={this.showHideForm}>Add Song</h3>
        <div id="add-song">
            <form  encType="multipart/form-data" onSubmit={this.handleSubmit}>
              <input type="file" id="file" name="name" />
              <input type="text" id="artist" name="artist" placeholder="Artist" />
              <input type="text" id="album" name="album" placeholder="Album"/>
              <input type="text" id="genre" name="genre" placeholder="Genre" />
              <input type="text" id="title" name="title" placeholder="Title" />
              <button type="submit">Add Song</button>
            </form>
            <div id="display-progress">
              {this.state.progress} 
            </div>
        </div>
      </div>
      )
  }
});

module.exports = AddSongBox;