var React = require('react');

var CreatePlayListBox = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var value = e.target.childNodes[0].value
    e.target.childNodes[0].value = "";
    var data = {
     playlist:{
       id: this.props.id,
       name: value
     }
     }
     this.sendPlayList(this.props.url, data)
  },

  sendPlayList: function(url, data) {
    var request = new XMLHttpRequest();
    request.open("POST",this.props.url +"play_lists");
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

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
       <input type="text" placeholder="Name" />
       <button type="submit">Create PlayList</button>
      </form>
      )
  }
});

module.exports = CreatePlayListBox;