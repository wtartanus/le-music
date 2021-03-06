var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var SignUp = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
   return { email: "", password: "", passwordConfirmation: ""}
  },

  signIn: function() {
    e.preventDefault();
    var request = new XMLHttpRequest();
    request.open("POST",this.props.url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.withCredentials = true;
    request.onload = function() {
      if(request.status === 201 ) {
        let user = JSON.parse(request.responseText);
        this.props.SignUp(user);
      } else if( request.status === 401 ) {

      }
    }.bind(this)
    var data = {
      user: {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    }
    }
    request.send(JSON.stringify(data));
  },

  render: function() {
    return (
      <form onSubmit={this.signIn} id="sign-up">
       <input type="text" valueLink={this.linkState('email')} placeholder="Email" />
       <input type="password" valueLink={this.linkState('password')} placeholder="Password" />
       <input type="password" valueLink={this.linkState('passwordConfirmation')} 
         placeholder="PasswordConfirmation" />

       <button type="submit">Sign Up</button>
      </form>
      )
  }

});

module.exports = SignUp;