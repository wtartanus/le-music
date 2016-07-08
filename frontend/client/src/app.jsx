var React = require('react');
var ReactDom = require('react-dom');
var MusicBox = require('./components/MusicBox.jsx');

window.onload = function() {
  ReactDom.render(
    <MusicBox />,
    document.getElementById('app')    
    );
}