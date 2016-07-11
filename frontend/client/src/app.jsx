var React = require('react');
var ReactDom = require('react-dom');
var MusicBox = require('./components/MusicBox.jsx');
var LoginBox = require('./components/LoginBox.jsx');

window.onload = function() {
  ReactDom.render(
    <LoginBox url="http://localhost:5000/" />,
    document.getElementById('app')    
    );
}