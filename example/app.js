/**
 * @jsx React.DOM
 */

var React = require("react");
window.React = React;
var ColorPicker = require("../lib/");

var App = React.createClass({

  getInitialState: function() {
    return {
      colorA : "#bada55",
      colorB : "#ffffff"
    };
  },

  render: function() {
    return (
      <div>
        <div className="picker picker-left">
          <ColorPicker color={this.state.colorA} onChange={this.handleChangeA} />
          <div className="picker-preview" style={{
            backgroundColor : this.state.colorA
          }} />
        </div>

        <div className="picker picker-right">
          <ColorPicker color={this.state.colorB} onChange={this.handleChangeB} />
          <div className="picker-preview" style={{
            backgroundColor : this.state.colorB
          }} />
        </div>

      </div>
    );
  },

  handleChangeA : function(color) {
    this.setState({ colorA : color });
    console.log(color);
  },
  handleChangeB : function(color) {
    this.setState({ colorB : color });
    console.log(color);
  },

});

React.renderComponent(<App />, document.body);
