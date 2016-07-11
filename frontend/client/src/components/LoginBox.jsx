var React = require('react');
var SignIn = require('./authentication/SignIn.jsx');
var SignOut = require('./authentication/SignOut.jsx');
var SignUp = require('./authentication/SignUp.jsx');
var MusicBox = require('./MusicBox.jsx');

var LoginBox = React.createClass({
 getInitialState: function() {
  return { currentUser: null, playLists: null}
 },

 setUser: function(user) {
   this.setState({currentUser: user});
   this.setState({playLists: user.playlists})
 },

 resetUser: function() {
   this.setState({currentUser: null});
   this.setState({playLists: null})
 },

 render: function() {
  var mainDiv = <div>
  <h4>Pleas Sign In/Up</h4>
    <SignIn url={this.props.url + "users/sign_in.json"} onSignIn={this.setUser} />
    <SignUp url={this.props.url + "users.json"} onSignUp={this.setUser} />
  </div>
  if(this.state.currentUser) {
    mainDiv = <MusicBox currentUser={this.state.currentUser} playLists={this.state.playLists} resetUser={this.resetUser} url={this.props.url}/>
  }
  return (
    <div>
      {mainDiv}
    </div>
    )
 }
});

module.exports = LoginBox;