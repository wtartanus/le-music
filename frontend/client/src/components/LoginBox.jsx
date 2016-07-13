var React = require('react');
var SignIn = require('./authentication/SignIn.jsx');
var SignOut = require('./authentication/SignOut.jsx');
var SignUp = require('./authentication/SignUp.jsx');
var MusicBox = require('./MusicBox.jsx');

var LoginBox = React.createClass({
 getInitialState: function() {
  return { currentUser: null, playLists: null, show: false}
 },

 setUser: function(user) {
   this.setState({currentUser: user});
   this.setState({playLists: user.playlists})
 },

 resetUser: function() {
   this.setState({currentUser: null});
   this.setState({playLists: null})
 },

 handleClick: function() {
  var login = document.getElementById('login');
  if(this.state.show) {
    login.style.display = "none"
    this.setState({show: false})
    return;
  }
  login.style.display = "initial"
  this.setState({show: true})
 },

 render: function() {
  var mainDiv = <div id="login-box">
     
        <h4 id="login-button" onClick={this.handleClick}>Please Sign In/Up</h4>
        <div id="login">
          <SignIn url={this.props.url + "users/sign_in.json"} onSignIn={this.setUser} />
          <SignUp url={this.props.url + "users.json"} onSignUp={this.setUser} />
    </div>
  </div>
  if(this.state.currentUser) {
    mainDiv = <MusicBox currentUser={this.state.currentUser} playLists={this.state.playLists} resetUser={this.resetUser} url={this.props.url}/>
  }
  return (
    <div>
     <h1 id="logo">LeMusic<p>&#9834;</p></h1>
     <p id="text">Because Music Should Be Always With YOU</p>
      {mainDiv}
    </div>
    )
 }
});

module.exports = LoginBox;