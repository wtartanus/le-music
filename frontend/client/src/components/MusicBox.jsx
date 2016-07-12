var React = require('react');
var AddSongBox = require('./AddSongBox.jsx');
var SignOut = require('./authentication/SignOut.jsx');
var PlayerBox = require('./PlayerBox.jsx');
var CreatePlayListBox = require('./CreatePlayListBox.jsx');

var MusicBox = React.createClass({
  getInitialState: function() {
     return {user: this.props.currentUser}
  },

  sendData: function(url,info) {
   var request = new XMLHttpRequest();
   request.open("POST", url + "/songs");
   request.setRequestHeader("Content-Type", "application/json");
   request.setRequestHeader("Accept", "application/json")
   request.withCredentials = true;
   request.onload = function() {
     if(request.status === 200 ) {

     } 
   }

   request.send( JSON.stringify( info ) );
  },

  render: function() {
    return (
      <div>
        <h1>MusicBox</h1>
        <div>
         <h4> Welcome {this.state.user.email}</h4>
         <SignOut url={this.props.url + "users/sign_out.json"} onSignOut={this.props.resetUser}></SignOut>
        </div>
        <AddSongBox sendInfo={this.sendData} url={this.props.url} />
        <CreatePlayListBox url={this.props.url} id={this.state.user.id}/>
        <PlayerBox url={this.props.url}/>
      </div>
      )
  }
});

module.exports = MusicBox;