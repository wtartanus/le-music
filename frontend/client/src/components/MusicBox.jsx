var React = require('react');

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
      } else {
        console.log("hi")
      }
    }
    request.send(null)
  },

  render: function() {
    return <h1>MusicBox</h1>
  }
});

module.exports = MusicBox;