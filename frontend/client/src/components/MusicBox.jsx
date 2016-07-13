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
      <div id="app-box">
        <h1 id="email">{this.state.user.email}</h1>
        <SignOut url={this.props.url + "users/sign_out.json"} onSignOut={this.props.resetUser}></SignOut>
        <CreatePlayListBox url={this.props.url} id={this.state.user.id}/>
        <AddSongBox sendInfo={this.sendData} url={this.props.url} />
       
        <PlayerBox url={this.props.url}/>
      </div>
      )
  }
});

module.exports = MusicBox;