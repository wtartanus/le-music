var React = require('react');

var CurrentPlayListBox = React.createClass({
  getInitialState: function() {
    return { name: ""}
  },

  componentDidMount: function() {
      this.setState({name: this.props.name})
  },
  
  render: function() {
    return (
     <h4>{this.state.name}</h4>
    )
  }
});

module.exports = CurrentPlayListBox;